import urlConstants from '../data/urlConstants';

/**
 * Server-side track search: text, genre and year filters plus paging.
 * @returns {Promise<{ total: number, skip: number, limit: number, items: object[] }>}
 */
const searchTracks = async ({ q = '', fields = [], genres = [], years = [], venues = [], skip = 0, limit = 60 }) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (fields.length) params.set('fields', fields.join(','));
    if (genres.length) params.set('genres', genres.join(','));
    if (years.length) params.set('years', years.join(','));
    if (venues.length) params.set('venues', venues.join(','));
    params.set('skip', String(skip));
    params.set('limit', String(limit));

    const response = await fetch(`${urlConstants.TRACKS_SEARCH_URL}?${params}`);
    if (!response.ok) throw new Error(`Track search failed (${response.status})`);
    return response.json();
};

// GET a JSON endpoint; resolves to the parsed body. `/api/track/:id` and
// `/api/show/:id` answer with an array (empty when nothing matches).
const getJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Request failed (${response.status}): ${url}`);
    return response.json();
};

const getTrack = async (id) => (await getJson(`/api/track/${encodeURIComponent(id)}`))[0] || null;
const getShow = async (id) => (await getJson(`/api/show/${encodeURIComponent(id)}`))[0] || null;

export { searchTracks, getTrack, getShow };
