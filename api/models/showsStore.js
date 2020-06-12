const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const showsStore = new mongoose.Schema({
    SHOW_ID: {
        type: String,
        trim: true,
    },
    SHOW_TITLE: {
        type: String,
        trim: true,
    },
    SHOW_DATE: {
        type: {key:Object},
    },
    DAY: {
        type: String,
        trim: true,
    },
    MONTH: {
        type: String,
        trim: true,
    },
    YEAR: {
        type: String,
        trim: true,
    },
    SHOW_LOCATION: {
        type: {key:Object},
    },
    COUNTRY: {
        type: String,
        trim: true,
    },
    CITY: {
        type: String,
        trim: true,
    },
    VENUE: {
        type: String,
        trim: true,
    },
    LAT: {
        type: Number,
        trim: true,
    },
    LNG: {
        type: Number,
        trim: true,
    }
}, {
    collection: 'afx_played_shows'
});

module.exports = mongoose.model('showsStore', showsStore);