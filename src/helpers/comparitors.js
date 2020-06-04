
/**
 * A comparison function - used to cross-check tags chosen by the user for intersection against the item tags
 * @param tagsArray - {array} - A group of tags chosen by the user.
 * @returns {function(*): boolean}
 */
const hasTags = (tagsArray) => {
    return track => tagsArray.length <= 0
        ? true
        : track.GENRES.filter(genre => tagsArray.includes(genre)).length > 0;
};


const inViewRange = (itemsBatchAmt, batchNum) => {
    return (track, index, arr) => index < (itemsBatchAmt * batchNum);
};

const withinPeriod = (periodsArray) => {

    return track => periodsArray.length <= 0
        ? true
        : periodsArray.includes(track.YEAR);
};

const _matchHelper = (item, property, text) => {
    return item[property] && typeof (item[property]) === 'string' && item[property].toLowerCase().includes(text);
};

const _isSearchUnneeded = (searchString, searchFor) => {
    return (searchString.length <= 0 || (
        !searchFor.searchTrackTitles &&
        !searchFor.searchArtistNames &&
        !searchFor.searchAlbumTitles
    ));
};

const hasMatchingText = (searchString, searchFor) => {
    const text = searchString.toLowerCase();
    return track => {
        if (_isSearchUnneeded(searchString, searchFor)) return true;
        return track &&
             (searchFor.searchTrackTitles && _matchHelper(track, 'TRACK_TITLE', text)) ||
             (searchFor.searchArtistNames && _matchHelper(track, 'ARTIST_NAME', text)) ||
             (searchFor.searchAlbumTitles && _matchHelper(track, 'ALBUM_TITLE', text))
    }
};

const areFiltersApplied = (filteredByTags, filteredByPeriods) => {
    return filteredByTags.length || filteredByPeriods.length;
};

export { hasTags, withinPeriod, hasMatchingText, inViewRange, areFiltersApplied };