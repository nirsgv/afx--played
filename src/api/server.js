const express = require('express');
//const bodyParser = require('body-parser');
const path = require('path');
const app = express();
// app.use(express.static(path.join(__dirname, 'build')));
const TRACKS = require('../data/tracks');
const SHOWS = require('../data/showsMap');

const sendMail = require('./mail');
const PORT = process.env.PORT || 8080;
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







app.listen(PORT);

// const express = require('express');
// const Joi = require('joi');
// const nodemailer = require("nodemailer");
//
// const app = express();
// const port = process.env.PORT || 3000;
//
// app.use(express.json());
//
// const tracks = [
//     {id:1, name: 'tracks first'},
//     {id:2, name: 'tracks second'},
//     {id:3, name: 'tracks third'},
// ];
//
// app.get('/', (req, res) => {
//     res.send('Hello world');
// });
//
// app.get('/api/tracks', (req, res) => {
//     res.send(tracks);
// });
//
// app.get('/api/tracks/:id', (req, res) => {
//     const course = tracks.find((track) => track.id === parseInt(req.params.id));
//     if (!course) return res.status(404).send('It was impossible to retrieve this track');
//     return res.send(course);
// });
//
// app.post('/api/tracks', (req, res) => {
//
//     const schema = {
//       name: Joi.string().min(3).required()
//     };
//     const validation = Joi.validate(req.body, schema);
//
//     // if (!req.body.name || req.body.name.length < 3) return res.status(404).send('No name was specified in body');
//     if (validation.error) return res.status(404).send(validation.error.details[0].message);
//     const track = {
//         id: tracks.length + 1,
//         name: `${req.body.name} ${tracks.length + 1}st`
//     };
//     tracks.push(track);
//     res.send(track);
// });
//
// app.put('/api/tracks/:id', (req, res) => {
//     const track = tracks.find((track) => track.id === parseInt(req.params.id));
//     if (!track) return res.status(404).send('It was impossible to retrieve this track');
//
//     const schema = {
//         name: Joi.string().min(3).required()
//     };
//     const validation = Joi.validate(req.body, schema);
//
//     if (validation.error) return res.status(404).send(validation.error.details[0].message);
//
//     track.name = req.body.name;
//     res.send(track);
// });
//
// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// });
//
// "use strict";
//
// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let testAccount = await nodemailer.createTestAccount();
//
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: testAccount.user, // generated ethereal user
//             pass: testAccount.pass // generated ethereal password
//         }
//     });
//
//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: 'nirsegevmail@gmail.com', // sender address
//         to: "nirsegevmail@gmail.com", // list of receivers
//         subject: "Hello ✔ Fred Foo 👻", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>" // html body
//     });
//
//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//
//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }
//
// main().catch(console.error);
//
//
// // app.put();
// // app.delete();