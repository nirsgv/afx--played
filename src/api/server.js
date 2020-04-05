//const bodyParser = require('body-parser');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const sendMail = require('./mail');
const { createServer } = require('http');
const path = require('path');
// app.use(express.static(path.join(__dirname, 'build')));
const TRACKS = require('../data/tracks');
const SHOWS = require('../data/showsMap');

const app = express();

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 80);

const dev = app.get('env') !== 'production';

app.disable('x-powered-by');
app.use(compression());
app.use(morgan('common'));
app.use(express.static(__dirname + '/../../build'));

// app.get('/', (req, res) => {
//     res.sendFile(express.static(__dirname, '/../../build', 'index.html'));
// });
app.use(morgan('dev'));

const server = createServer(app);
console.log(process.env.NODE_ENV);
console.log(PORT);


app.use(express.urlencoded({extended: false}));
app.use(express.json());




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


app.get('/*', function (req, res) {
    return res.sendFile(path.resolve(__dirname + '/../../build/index.html'));
});


server.listen(PORT, err => {
    if (err) throw err;

    console.log('server started');
});

