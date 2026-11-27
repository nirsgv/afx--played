const tracksStore = require('../models/tracksStore');

exports.getTracks = async (req, res) => {
    try {
        res.json(await tracksStore.find({}));
    } catch (err) {
        console.error('Could not retrieve tracks', err);
        res.status(500).json({ error: 'Could not retrieve tracks' });
    }
};

exports.getTrack = async (req, res) => {
    try {
        res.json(await tracksStore.find({ ID: req.params.id }));
    } catch (err) {
        console.error('Could not retrieve track', err);
        res.status(500).json({ error: 'Could not retrieve track' });
    }
};
