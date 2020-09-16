const inViewRange = (itemsBatchAmt, batchNum) => {
  return (track, index, arr) => index < itemsBatchAmt * batchNum;
};

const withinPeriod = (periodsArray) => {
  return (track) =>
    periodsArray.length <= 0 ? true : periodsArray.includes(track.YEAR);
};

const _matchHelper = (item, property, text) => {
  return (
    item[property] &&
    typeof item[property] === 'string' &&
    item[property].toLowerCase().includes(text)
  );
};

const _isSearchUnneeded = (searchString, searchFor) => {
  return (
    searchString.length <= 0 ||
    (!searchFor.searchTrackTitles &&
      !searchFor.searchArtistNames &&
      !searchFor.searchAlbumTitles)
  );
};

const hasMatchingText = (searchString, searchFor) => {
  const text = searchString.toLowerCase();
  return (track) => {
    if (_isSearchUnneeded(searchString, searchFor)) return true;
    return (
      (track &&
        searchFor.searchTrackTitles &&
        _matchHelper(track, 'TRACK_TITLE', text)) ||
      (searchFor.searchArtistNames &&
        _matchHelper(track, 'ARTIST_NAME', text)) ||
      (searchFor.searchAlbumTitles && _matchHelper(track, 'ALBUM_TITLE', text))
    );
  };
};

const areFiltersApplied = (
  filteredByTags,
  filteredByPeriods,
  filteredBySearch
) => {
  return (
    filteredByTags.length || filteredByPeriods.length || filteredBySearch.length
  );
};

export { withinPeriod, hasMatchingText, inViewRange, areFiltersApplied };
