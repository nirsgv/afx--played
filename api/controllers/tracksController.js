const { getTracks, getTrack } = require('../queries');

exports.getTracks = async (req, res) => {
    try {
        res.json(await getTracks());
    } catch (err) {
        console.error('Could not retrieve tracks', err);
        res.status(500).json({ error: 'Could not retrieve tracks' });
    }
};

exports.getTrack = async (req, res) => {
    try {
        res.json(await getTrack(req.params.id));
    } catch (err) {
        console.error('Could not retrieve track', err);
        res.status(500).json({ error: 'Could not retrieve track' });
    }
};
