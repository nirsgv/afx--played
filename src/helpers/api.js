import urlConstants from '../data/urlConstants';

/**
 * Server-side track search: text, genre and year filters plus paging.
 * @returns {Promise<{ total: number, skip: number, limit: number, items: object[] }>}
 */
const searchTracks = async ({ q = '', fields = [], genres = [], years = [], skip = 0, limit = 60 }) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (fields.length) params.set('fields', fields.join(','));
    if (genres.length) params.set('genres', genres.join(','));
    if (years.length) params.set('years', years.join(','));
    params.set('skip', String(skip));
    params.set('limit', String(limit));

    const response = await fetch(`${urlConstants.TRACKS_SEARCH_URL}?${params}`);
    if (!response.ok) throw new Error(`Track search failed (${response.status})`);
    return response.json();
};

export { searchTracks };
