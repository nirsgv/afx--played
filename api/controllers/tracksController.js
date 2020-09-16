const tracksStore = require('../models/tracksStore');
//import all of our models, a singleton is implemented, once this is required it is available throught the app

exports.getTracks = (req, res) => {
  tracksStore.find({}, function (err, result) {
    if (err) {
      console.log('It was possible to retrieve these TRACKS');
      res.send(err);
    } else {
      //   console.log(typeof result, result);
      res.json(result);
    }
  });
};

exports.getTrackById = (req, res) => {
  tracksStore.find({ ID: req.params.id }, function (err, result) {
    if (err) {
      console.log('It was possible to retrieve these TRACKS');
      res.send(err);
    } else {
      res.json(result);
    }
  });
};

const gatherObjValuesFromKeysArr = (objKeys, obj) => {
  return objKeys.reduce(function (prev, item) {
    return prev.concat(obj[item]);
  }, []);
};
const yearsMap = {
  '#60a': [1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969],
  '#70a': [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979],
  '#80a': [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989],
  '#90a': [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  '#00a': [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],
  '#10a': [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
  '#20a': [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029],
};

exports.getFilteredTracks = (req, res) => {
  const reqBod = req.body;
  const { filteredByTags, filteredByPeriods } = reqBod;

  tracksStore.find(
    {
      $and: [
        { GENRES: { $in: [...filteredByTags] } },
        {
          YEAR: {
            $in: [
              ...combineByObjKeysArr(
                filteredByPeriods.length
                  ? filteredByPeriods
                  : Object.keys(yearsMap),
                yearsMap
              ),
            ],
          },
        },
      ],
    },

    function (err, result) {
      if (err) {
        console.log('It was possible to retrieve these TRACKS');
        res.send(err);
      } else {
        res.json(result);
      }
      console.log(req.body);
    }
  );
};

exports.getFilteredTrackIds = (req, res) => {
  const { filteredByTags, filteredByPeriods } = req.body;
  tracksStore.find(
    {
      $and: [
        { GENRES: { $in: [...filteredByTags] } },
        {
          YEAR: {
            $in: [
              ...gatherObjValuesFromKeysArr(
                filteredByPeriods.length
                  ? filteredByPeriods
                  : Object.keys(yearsMap),
                yearsMap
              ),
            ],
          },
        },
      ],
    },
    { ID: 1, _id: 0 },

    function (err, result) {
      if (err) {
        console.log('It was possible to retrieve these TRACKS');
        res.send(err);
      } else {
        console.log(typeof result, result);
        res.json(result);
      }
      console.log(req.body);
    }
  );
};

exports.getTracksPlayedInConcert = (req, res) => {
  const concertId = req.params.id;
  tracksStore.find({ VENUES: { $in: [concertId] } }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
    console.log(req.body);
  });
};

exports.searchTracks = (req, res) => {
  const { filteredBySearch, searchArtistNames, searchTrackTitles } = req.body;
  let choice;
  const regPat = { $regex: filteredBySearch, $options: 'i' };
  if (
    (searchArtistNames && searchTrackTitles) ||
    (!searchArtistNames && !searchTrackTitles)
  ) {
    choice = {
      $or: [{ ARTIST_NAME: regPat }, { TRACK_TITLE: regPat }],
    };
  } else if (searchArtistNames) {
    choice = { ARTIST_NAME: regPat };
  } else {
    choice = { TRACK_TITLE: regPat };
  }
  tracksStore.find(choice, { ID: 1, _id: 0 }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};

// exports.getTrack =  async (req, res) => {
//     const track = await tracksStore.findOne({ ID: req.params.id });
//     return track;
// };
