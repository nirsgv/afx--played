const showsStore = require('../models/showsStore');

exports.getShows = async (req, res) => {
    try {
        res.json(await showsStore.find({}));
    } catch (err) {
        console.error('Could not retrieve shows', err);
        res.status(500).json({ error: 'Could not retrieve shows' });
    }
};

exports.getShow = async (req, res) => {
    try {
        res.json(await showsStore.find({ ID: req.params.id }));
    } catch (err) {
        console.error('Could not retrieve show', err);
        res.status(500).json({ error: 'Could not retrieve show' });
    }
};
