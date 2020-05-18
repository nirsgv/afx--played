const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

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

// storeSchema.pre('save', function(next) {
//     if (!this.isModified('name')) {
//         next(); // skip it
//         return; // stop this function from running
//     }
//     this.slug = slug(this.name);
//     next();
//     // TODO make more resiliant so slugs are unique
// }
// );

module.exports = mongoose.model('tracksStore', tracksStore);