// Data access shared by the Express server (local dev) and the Lambda API (production).
const tracksStore = require('./models/tracksStore');
const showsStore = require('./models/showsStore');
const { buildTrackSearch } = require('./trackSearch');

const getTracks = () => tracksStore.find({});
const getTrack = (id) => tracksStore.find({ ID: id });
const getShows = () => showsStore.find({});
const getShow = (id) => showsStore.find({ SHOW_ID: id });

// Text search, genre/year filters and paging, all in MongoDB.
const searchTracks = async (params) => {
    const { filter, skip, limit } = buildTrackSearch(params);
    const [total, items] = await Promise.all([
        tracksStore.countDocuments(filter),
        // Stored order, the same order /api/tracks returns, so the list looks as before.
        tracksStore.find(filter).sort({ $natural: 1 }).skip(skip).limit(limit).lean(),
    ]);
    return { total, skip, limit, items };
};

// Route table used by both servers: [pattern, handler(params, query)].
const routes = [
    [/^\/api\/tracks$/, () => getTracks()],
    [/^\/api\/tracks\/search$/, (_, query) => searchTracks(query)],
    [/^\/api\/track\/([^/]+)$/, ([id]) => getTrack(id)],
    [/^\/api\/shows$/, () => getShows()],
    [/^\/api\/show\/([^/]+)$/, ([id]) => getShow(id)],
];

const matchRoute = (pathname, query = {}) => {
    for (const [pattern, handler] of routes) {
        const match = pathname.match(pattern);
        if (match) return () => handler(match.slice(1).map(decodeURIComponent), query);
    }
    return null;
};

module.exports = { getTracks, getTrack, getShows, getShow, searchTracks, matchRoute };
