import React, { useEffect, useReducer } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tags from './tags';
import Img from './img';
import { filterByTagCb } from '../actions';
import MoreInfoButton from '../components/moreInfoButton';
import List from '../components/list';

const localNamespace = 'afx-tracks-data';
const initialTrackData = {
  ARTIST_NAME: '',
  TRACK_TITLE: '',
  YEAR: 2000,
  GENRES: [],
  LINKS: [],
  ID: '',
  ALBUM_ID: '',
};

const initialState = {
  trackData: initialTrackData,
  loader: false,
};
function itemReducer(state, action) {
  switch (action.type) {
    case 'setTrackData':
      return { ...state, trackData: action.payload };
    case 'setLoader':
      return { ...state, loader: action.payload };
    default:
      throw new Error();
  }
}

const isTrackStoredLocal = (trackID) => {
  !localStorage.getItem(localNamespace) &&
    localStorage.setItem(localNamespace, '{}');
  return JSON.parse(localStorage.getItem(localNamespace)).hasOwnProperty(
    trackID
  );
};

function Item({ trackID, setPlayerItem, filterByTagCb }) {
  const [state, dispatch] = useReducer(itemReducer, initialState);
  const {
    ARTIST_NAME,
    TRACK_TITLE,
    YEAR,
    GENRES,
    ALBUM_ID,
    ID,
  } = state.trackData;

  useEffect(() => {
    mfasync(trackID);
  }, [trackID]);

  const mfasync = async (trackID) => {
    await dispatch({ type: 'setLoader', payload: true });
    (await !isTrackStoredLocal(trackID))
      ? fetch(window.location.origin + '/api/track/' + trackID)
          .then((response) => response.json())
          .then((data) => {
            dispatch({
              type: 'setTrackData',
              payload: data[0] ? data[0] : initialTrackData,
            });
            const curr = JSON.parse(localStorage.getItem(localNamespace));
            curr[trackID] = data[0];
            localStorage.setItem(localNamespace, JSON.stringify(curr));
          })
      : dispatch({
          type: 'setTrackData',
          payload: JSON.parse(localStorage.getItem(localNamespace))[trackID],
        });
    dispatch({ type: 'setLoader', payload: false });
  };
  return (
    <li className={`track`}>
      <div className='track__body'>
        <div className='track__header'>
          <p className='track__text-wrap'>
            <span className='track__artist-name'>{ARTIST_NAME}</span>
            <span className='track__track-title'>{TRACK_TITLE}</span>
            <span className='track__album-title'>{`${YEAR}`}</span>
          </p>

          <Img
            src={`../assets/album_covers/160x160pp/${ALBUM_ID}.jpg`}
            alt={''}
            transitionSeconds={3}
            blockClassName={'track'}
          />
        </div>

        <Tags
          className='track__track-tags'
          tags={GENRES}
          tagCb={(tag) => filterByTagCb(tag)}
        />
      </div>

      <List baseClassName={'internal-links'}>
        <MoreInfoButton ID={ID} />
      </List>
    </li>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      filterByTagCb,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Item);
