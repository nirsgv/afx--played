// Environment variables are loaded by Node itself: `node --env-file-if-exists=variables.env`
// (see the npm scripts). In production, set them on the host instead.
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const tracksController = require('./controllers/tracksController');
const showsController = require('./controllers/showsController');

const PORT = parseInt(process.env.PORT || 8000, 10);
const BUILD_DIR = path.resolve(__dirname, '../build');
const dev = process.env.NODE_ENV !== 'production';

if (!process.env.DATABASE) {
    console.error('DATABASE is not set. Add it to variables.env (see README).');
    process.exit(1);
}

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB error → ${err.message}`);
});

const app = express();

app.disable('x-powered-by');
app.use(compression());
app.use(morgan(dev ? 'dev' : 'common'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(BUILD_DIR));

app.get('/api/tracks', tracksController.getTracks);
app.get('/api/tracks/search', tracksController.searchTracks);
app.get('/api/track/:id', tracksController.getTrack);
app.get('/api/shows', showsController.getShows);
app.get('/api/show/:id', showsController.getShow);

// Client-side routes are served the SPA shell; React Router takes it from there.
const sendIndex = (req, res) => res.sendFile(path.join(BUILD_DIR, 'index.html'));
app.get(['/about', '/track/*splat', '/concert/*splat'], sendIndex);

const start = async () => {
    await mongoose.connect(process.env.DATABASE);
    console.log('Connection with MongoDB was successful');

    app.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`server started on http://localhost:${PORT}`);
    });
};

start().catch((err) => {
    console.error(`Failed to start: ${err.message}`);
    process.exit(1);
});
