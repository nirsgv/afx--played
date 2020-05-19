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
        type: {key:String},
        trim: true
    },
    SHOW_LOCATION: {
        type: {key:String},
        trim: true,
    },
}, {
    collection: 'afx_played_shows'
});

module.exports = mongoose.model('showsStore', showsStore);