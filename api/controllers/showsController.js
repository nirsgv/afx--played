const showsStore = require('../models/showsStore');
//import all of our models, a singleton is implemented, once this is required it is available throught the app


exports.getShows = (req, res) => {
    showsStore.find({}, function(err, result) {
      if (err) {
          console.log('It was possible to retrieve these SHOWS');
          res.send(err);
      } else {
          console.log(typeof result, result);
          res.json(result);
      }
  });
};

exports.getShow =  (req, res) => {
    showsStore.find({ID:req.params.id}, function(err, result) {
        if (err) {
            console.log('It was possible to retrieve these TRACKS');
            res.send(err);
        } else {
            console.log(typeof result, result);
            res.json(result);
        }
    });
};