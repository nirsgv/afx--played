
// app.get('/api/ttt', function (req, res) {
//     console.log(tracksStore);
//
//     // return res.json(tracksStore);
//     tracksStore.find({"ARTIST_NAME": "Lanark Artefax"}, function(err, result) {
//         if (err) {
//             res.send(err);
//         } else {
//             console.log(typeof result, result);
//             res.json(result);
//         }
//     })
// });

// app.get('/api/track/:id', (req, res) => {
//     const track = TRACKS.find((track) => Object.is(track.id, req.ID));
//     console.log('It was possible to retrieve this track');
//     if (!track) return res.status(404).send('It was impossible to retrieve this track');
//     return res.send(track);
// });

// app.get('/api/aphex', function (req, res) {
//     res.sendFile(path.join(__dirname, '../assets', 'aphex-logo.svg'));
// });
//
// app.post('/api/email', (req, res) => {
//     console.log('Server received our message');
//     console.log(sendMail);
//     sendMail('nirsegevmail@gmail.com','bbb','nirsegevmail@gmail.com');
//     // send email here (later)
//     res.json({message: 'Message received!'});
// });
//
// app.get('/', function (req, res) {
//     return res.sendFile(path.resolve(__dirname + '/../../build/index.html'));
// });
