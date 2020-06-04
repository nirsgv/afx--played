const tracksStore = require('../models/tracksStore');
//import all of our models, a singleton is implemented, once this is required it is available throught the app


exports.getTracks = (req, res) => {
    tracksStore.find({}, function(err, result) {
      if (err) {
          console.log('It was possible to retrieve these TRACKS');
          res.send(err);
      } else {
          console.log(typeof result, result);
          res.json(result);
      }
  });
};

exports.getTrack =  (req, res) => {
    tracksStore.find({ID:req.params.id}, function(err, result) {
        if (err) {
            console.log('It was possible to retrieve these TRACKS');
            res.send(err);
        } else {
            console.log(typeof result, result);
            res.json(result);
        }
    });
};

// exports.getTrack =  async (req, res) => {
//     const track = await tracksStore.findOne({ ID: req.params.id });
//     return track;
// };