const showsStore = require('../models/showsStore');
//import all of our models, a singleton is implemented, once this is required it is available throught the app

exports.getShows = (req, res) => {
  showsStore.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      console.log(typeof result, result);
      res.json(result);
    }
  });
};

exports.getShow = (req, res) => {
  showsStore.find({ ID: req.params.id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      console.log(typeof result, result);
      res.json(result);
    }
  });
};

exports.getShowById = (req, res) => {
  showsStore.find({ SHOW_ID: req.params.id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};
