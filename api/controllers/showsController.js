const { getShows, getShow } = require('../queries');

exports.getShows = async (req, res) => {
    try {
        res.json(await getShows());
    } catch (err) {
        console.error('Could not retrieve shows', err);
        res.status(500).json({ error: 'Could not retrieve shows' });
    }
};

exports.getShow = async (req, res) => {
    try {
        res.json(await getShow(req.params.id));
    } catch (err) {
        console.error('Could not retrieve show', err);
        res.status(500).json({ error: 'Could not retrieve show' });
    }
};
