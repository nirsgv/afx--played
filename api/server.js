const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname + '/../variables.env') });
const tracksController = require('./controllers/tracksController');
const showsController = require('./controllers/showsController');
console.log(tracksController);
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require("cors");

const MongoStore = require('connect-mongo')(session);
const compression = require('compression');
const morgan = require('morgan');
const sendMail = require('./mail');

const TRACKS = require('../src/data/tracks');
const SHOWS = require('../src/data/showsMap');
const app = express();

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 8000);
//const PORT = normalizePort(process.env.PORT || 3000);
const dev = app.get('env') !== 'production';

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
});

const connection = mongoose.connection;
connection.once("open", function() {
    console.log("Connection with MongoDB was successful");
});

mongoose.Promise = global.Promise; // Tells Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

app.use(express.static(__dirname + '/../../build'));
app.disable('x-powered-by');
app.use(compression());
app.use(morgan('common'));
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
console.log({'process.env.NODE_ENV':process.env.NODE_ENV, PORT});

app.get('/api/tracks', tracksController.getTracks);
app.get('/api/track/:id', tracksController.getTrack);
app.get('/api/shows', showsController.getShows);
app.get('/api/show:id', showsController.getShow);

app.listen(PORT, err => {
    if (err) throw err;
    console.log('server started');
});