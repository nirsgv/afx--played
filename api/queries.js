// Data access shared by the Express server (local dev) and the Lambda API (production).
const tracksStore = require('./models/tracksStore');
const showsStore = require('./models/showsStore');

const getTracks = () => tracksStore.find({});
const getTrack = (id) => tracksStore.find({ ID: id });
const getShows = () => showsStore.find({});
const getShow = (id) => showsStore.find({ SHOW_ID: id });

// Route table used by both servers: [pattern, handler(params)].
const routes = [
    [/^\/api\/tracks$/, () => getTracks()],
    [/^\/api\/track\/([^/]+)$/, ([id]) => getTrack(id)],
    [/^\/api\/shows$/, () => getShows()],
    [/^\/api\/show\/([^/]+)$/, ([id]) => getShow(id)],
];

const matchRoute = (pathname) => {
    for (const [pattern, handler] of routes) {
        const match = pathname.match(pattern);
        if (match) return () => handler(match.slice(1).map(decodeURIComponent));
    }
    return null;
};

module.exports = { getTracks, getTrack, getShows, getShow, matchRoute };
