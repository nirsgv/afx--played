import React, { useState, useEffect, useReducer } from 'react';
import { randomIntFromInterval } from '../helpers/math';
import { debounce, throttle } from '../helpers/higherFunctions';

const useFetch = (url, initialValue) => {
  const [result, setResult] = useState(initialValue);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return result;
};

const useSetPageName = (cb, name) => {
  useEffect(() => {
    cb(name);
    return () => {};
  }, []);
};

const useMediaQuery = (query) => {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });
  return matches;
};

const useShadowAnimaStyle = (x = 0, y = 0, moveAmt = 1) => {
  const [xCoor, setXCoor] = useState(x);
  const [yCoor, setYCoor] = useState(y);
  let intervalHolder;

  useEffect(() => {
    intervalHolder = setInterval(() => {
      setXCoor(randomIntFromInterval(-moveAmt, moveAmt));
      setYCoor(randomIntFromInterval(-moveAmt, moveAmt));
    }, 1000);
    return () => clearInterval(intervalHolder);
  }, []);

  return {
    filter: `drop-shadow(${2 + xCoor}px ${4 + yCoor}px 8px #6d8c7899)`,
  };
};

const useIsScrolled = () => {
  const [scrollY, setScrollY] = useState(
    window.pageYOffset || document.documentElement.scrollTop
  );
  const listener = () => {
    setScrollY(window.pageYOffset || document.documentElement.scrollTop);
  };
  const delay = 500;

  useEffect(() => {
    window.addEventListener('scroll', throttle(listener, delay));
    return () => {
      window.removeEventListener('scroll', listener);
    };
  });

  return scrollY > 200;
};

// const useItemData = () => {
//   const initialTrackData = {
//     ARTIST_NAME: '',
//     TRACK_TITLE: '',
//     YEAR: 2000,
//     GENRES: [],
//     LINKS: [],
//     ID: '',
//     ALBUM_ID: '',
//   };
//   const localNamespace = 'afx-tracks-data';

//   const initialState = {
//     trackData: initialTrackData,
//     loader: false,
//     entranceClassName: 'faded-in-from-bottom',
//   };
//   function itemReducer(state, action) {
//     switch (action.type) {
//       case 'setTrackData':
//         return { ...state, trackData: action.payload };
//       case 'setLoader':
//         return { ...state, loader: action.payload };
//       case 'setEntranceClassName':
//         return { ...state, entranceClassName: action.payload };
//       default:
//         throw new Error();
//     }
//   }
//   const isTrackStoredLocal = (trackID) => {
//     !localStorage.getItem(localNamespace) &&
//       localStorage.setItem(localNamespace, '{}');
//     return JSON.parse(localStorage.getItem(localNamespace)).hasOwnProperty(
//       trackID
//     );
//   };

//   useEffect(() => {
//     setSpaPageName && setSpaPageName('expanded-item');
//     scrollTop();
//     mfasync(decodeURIComponent(match.params.id));
//   }, [match.params.id]);

//   const mfasync = async (trackID) => {
//     await dispatch({ type: 'setLoader', payload: true });
//     (await !isTrackStoredLocal(trackID))
//       ? fetch(window.location.origin + '/api/track/' + trackID)
//           .then((response) => response.json())
//           .then((data) => {
//             dispatch({
//               type: 'setTrackData',
//               payload: data[0] ? data[0] : initialTrackData,
//             });
//             const curr = JSON.parse(localStorage.getItem(localNamespace));
//             curr[trackID] = data[0];
//             localStorage.setItem(localNamespace, JSON.stringify(curr));
//           })
//       : dispatch({
//           type: 'setTrackData',
//           payload: JSON.parse(localStorage.getItem(localNamespace))[trackID],
//         });
//     dispatch({ type: 'setLoader', payload: false });
//   };

//   return scrollY > 200;
// };

const useMedia = (queries, values, defaultValue) => {
  // Array containing a media query list for each query
  const mediaQueryLists = queries.map((q) => window.matchMedia(q));

  // Function that gets value based on matching media query
  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    // Return related value or defaultValue if none
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  };

  // State and setter for matched value
  const [value, setValue] = useState(getValue);

  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach((mql) => mql.addListener(handler));
      // Remove listeners on cleanup
      return () =>
        mediaQueryLists.forEach((mql) => mql.removeListener(handler));
    },
    [] // Empty array ensures effect is only run on mount and unmount
  );

  return value;
};

export {
  useSetPageName,
  useFetch,
  useMediaQuery,
  useShadowAnimaStyle,
  useIsScrolled,
  useMedia,
};
