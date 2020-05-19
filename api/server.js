require('dotenv').config({ path: '../variables.env' });

const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require("cors");

const MongoStore = require('connect-mongo')(session);
const compression = require('compression');
const morgan = require('morgan');
const sendMail = require('./mail');
const path = require('path');
const TRACKS = require('../src/data/tracks');
const SHOWS = require('../src/data/showsMap');
const app = express();

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

const tracksStore = require('./models/Store');
//import all of our models, a singleton is implemented, once this is required it is available throught the app

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 8000);
//const PORT = normalizePort(process.env.PORT || 3000);

const dev = app.get('env') !== 'production';

app.use(express.static(__dirname + '/../../build'));
app.disable('x-powered-by');
app.use(compression());
app.use(morgan('common'));
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
console.log({'process.env.NODE_ENV':process.env.NODE_ENV, PORT});


// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
// app.use(session({
//     secret: "snickers",
//     key: "sweetsesh",
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ mongooseConnection: mongoose.connection })
// }));

app.get('/api/ttt', function (req, res) {
    console.log(tracksStore);

    return res.json(tracksStore);
    tracksStore.find({"ARTIST_NAME": "Lanark Artefax"}, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    })
});

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/api/tracks', (req, res) => {
    console.log('It was possible to retrieve these TRACKS');
    res.send(TRACKS);
});

app.get('/api/shows', (req, res) => {
    console.log('It was possible to retrieve these SHOWS');
    res.send(SHOWS);
});

app.get('/api/track/:id', (req, res) => {
    const track = TRACKS.find((track) => Object.is(track.id, req.ID));
    console.log('It was possible to retrieve this track');
    if (!track) return res.status(404).send('It was impossible to retrieve this track');
    return res.send(track);
});

app.get('/api/show/:id', (req, res) => {
    const show = SHOWS[req.params.id];
    console.log('It was possible to retrieve this show');

    if (!show) return res.status(404).send('It was impossible to retrieve this show');
    return res.send(show);
});

app.get('/api/aphex', function (req, res) {
    res.sendFile(path.join(__dirname, '../assets', 'aphex-logo.svg'));
});


app.post('/api/email', (req, res) => {
    console.log('Server received our message');
    console.log(sendMail);
    sendMail('nirsegevmail@gmail.com','bbb','nirsegevmail@gmail.com');
    // send email here (later)
    res.json({message: 'Message received!'});
});


app.get('/', function (req, res) {
    return res.sendFile(path.resolve(__dirname + '/../../build/index.html'));
});


app.listen(PORT, err => {
    if (err) throw err;
    console.log('server started');
});

