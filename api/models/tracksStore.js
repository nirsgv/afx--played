const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const tracksStore = new mongoose.Schema({
    ARTIST_NAME: {
        type: String,
        trim: true,
    },
    ALBUM_TITLE: {
        type: String,
        trim: true,
    },
    TRACK_TITLE: {
        type: String,
        trim: true
    },
    RECORD_LABEL: {
        type: String,
        trim: true,
    },
    CAT: {
        type: String,
        trim: true,
    },
    DURATION: {
        type: Number,
        trim: true
    },
    YEAR: {
        type: Number,
        trim: true
    },
    GENRES: [String],
    LINKS: {key:String},
    VENUES: [String],
    ID: String,
    ALBUM_ID: String,
}, {
    collection: 'afx_played_tracks'
});

module.exports = mongoose.model('tracksStore', tracksStore);