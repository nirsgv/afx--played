// Builds the MongoDB filter and paging for GET /api/tracks/search.
// Pure (no database access) so it can be unit tested.

const SEARCH_FIELDS = {
    artist: 'ARTIST_NAME',
    track: 'TRACK_TITLE',
    album: 'ALBUM_TITLE',
};

const DEFAULT_LIMIT = 8;
const MAX_LIMIT = 100;
const MAX_QUERY_LENGTH = 100;

// Query values arrive as comma-separated strings (Lambda function URLs join
// repeated parameters with commas too), or as arrays from Express.
const toList = (value) =>
    (Array.isArray(value) ? value.join(',') : String(value ?? ''))
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

const toInt = (value, fallback, min, max) => {
    const n = Number.parseInt(value, 10);
    return Number.isNaN(n) ? fallback : Math.min(Math.max(n, min), max);
};

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * @param {object} params - query string parameters
 * @param {string} [params.q] - text to find (case-insensitive substring)
 * @param {string} [params.fields] - which fields `q` searches: artist,track,album
 * @param {string} [params.genres] - genre keys; a track matches if it has any of them
 * @param {string} [params.years] - years; a track matches if its YEAR is one of them
 * @param {string} [params.skip] - items to skip (paging offset)
 * @param {string} [params.limit] - page size, 1-100
 * @returns {{ filter: object, skip: number, limit: number }}
 */
const buildTrackSearch = (params = {}) => {
    const filter = {};

    const q = String(params.q ?? '').trim().slice(0, MAX_QUERY_LENGTH);
    const fields = toList(params.fields).map((f) => SEARCH_FIELDS[f]).filter(Boolean);
    if (q && fields.length) {
        const pattern = new RegExp(escapeRegex(q), 'i');
        filter.$or = [...new Set(fields)].map((field) => ({ [field]: pattern }));
    }

    const genres = toList(params.genres);
    if (genres.length) filter.GENRES = { $in: genres };

    const years = toList(params.years).map(Number).filter(Number.isInteger);
    if (years.length) filter.YEAR = { $in: [...new Set(years)] };

    return {
        filter,
        skip: toInt(params.skip, 0, 0, Number.MAX_SAFE_INTEGER),
        limit: toInt(params.limit, DEFAULT_LIMIT, 1, MAX_LIMIT),
    };
};

module.exports = { buildTrackSearch, SEARCH_FIELDS, DEFAULT_LIMIT, MAX_LIMIT };
