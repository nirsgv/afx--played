import React, { useReducer, useEffect } from 'react';
import { Router } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  toggleShareExpansion,
  setPlayerItem,
  dispatchMessageToModal,
  setSpaPageName,
} from '../actions/index';
import { connect } from 'react-redux';
import ExternalLinks from '../components/externalLinks';
import Concerts from '../components/concerts';
import DefinitionList from '../components/definitionList';
import Tags from '../components/tags';
import { getDurationFromSeconds } from '../helpers/str';
import Share from '../components/share';
import { scrollTop } from '../helpers/dom';
import BackButton from '../components/backButton';
const initialTrackData = {
  ARTIST_NAME: '',
  TRACK_TITLE: '',
  YEAR: 2000,
  GENRES: [],
  LINKS: [],
  ID: '',
  ALBUM_ID: '',
  VENUES: [],
};
const localNamespace = 'afx-tracks-data';

const initialState = {
  trackData: initialTrackData,
  loader: false,
  entranceClassName: 'faded-in-from-bottom',
};
function itemReducer(state, action) {
  switch (action.type) {
    case 'setTrackData':
      return { ...state, trackData: action.payload };
    case 'setLoader':
      return { ...state, loader: action.payload };
    case 'setEntranceClassName':
      return { ...state, entranceClassName: action.payload };
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
const ExpandedItem = ({
  match,
  history,
  toggleShareExpansion,
  dispatchMessageToModal,
  setSpaPageName,
  entranceClassName,
}) => {
  useEffect(() => {
    setSpaPageName && setSpaPageName('expanded-item');
    scrollTop();
    mfasync(decodeURIComponent(match.params.id));
  }, [match.params.id]);

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

  const [state, dispatch] = useReducer(itemReducer, initialState);
  const {
    ARTIST_NAME,
    ALBUM_TITLE,
    TRACK_TITLE,
    RECORD_LABEL,
    CAT,
    DURATION,
    YEAR,
    GENRES,
    LINKS,
    ID,
    ALBUM_ID,
    VENUES,
  } = state.trackData;
  return (
    <>
      <div className='bkg__wrap'>
        <div
          className='bkg__layer'
          style={{
            backgroundImage: `url(../assets/album_covers/160x160pp/${ALBUM_ID}.jpg)`,
          }}
        />
      </div>

      <div
        className={`animate-content ${entranceClassName}`}
        onAnimationEnd={() =>
          dispatch({ type: 'setEntranceClassName', payload: '' })
        }
      >
        <div className={`expanded-item__wrap`}>
          {/*block1*/}
          <nav className='back-btn__wrap expanded-item__back'>
            <BackButton history={history} className={'back-btn'} />
          </nav>

          {/*block2*/}
          <div className='row'>
            <div className='details-and-shows'>
              <section className='expanded-item__details'>
                <h2 className='expanded-item__section-title'>Track Details</h2>
                <h3>
                  <DefinitionList
                    classNameSpace={'inner-item'}
                    term={'Artist'}
                    definition={ARTIST_NAME}
                  />
                </h3>
                <h3>
                  <DefinitionList
                    classNameSpace={'inner-item'}
                    term={'Track'}
                    definition={`${TRACK_TITLE} (${getDurationFromSeconds(
                      DURATION
                    )})`}
                  />
                </h3>
                <h3>
                  <DefinitionList
                    classNameSpace={'inner-item'}
                    term={'Album'}
                    definition={`${ALBUM_TITLE} (${YEAR})`}
                  />
                </h3>
                <h3>
                  <DefinitionList
                    classNameSpace={'inner-item'}
                    term={'Label'}
                    definition={`${RECORD_LABEL} (${CAT})`}
                  />
                </h3>
                <h3>
                  <DefinitionList classNameSpace={'inner-item'} term={'Genres'}>
                    <Tags className='track__track-tags' tags={GENRES} />
                  </DefinitionList>
                </h3>
              </section>

              {/*block3*/}

              <section className='expanded-item__shows'>
                <h2 className='expanded-item__section-title'>
                  Played in shows
                </h2>
                <Concerts concertIds={VENUES}></Concerts>
              </section>
            </div>

            <div className='links-and-share'>
              {/*block4*/}
              <section className='expanded-item__external-links'>
                <h2 className='expanded-item__section-title'>External Links</h2>
                <ExternalLinks
                  className='track__track-links'
                  links={LINKS}
                  ID={ID}
                  blockClassName={'external-links'}
                />
              </section>

              {/*block5*/}
              <section className='expanded-item__share'>
                <h2 className='expanded-item__section-title'>Share</h2>
                <Share
                  url={'http://localhost:3000/track/fis+patupaiarehe'}
                  onShareWindowClose={toggleShareExpansion}
                  dispatchMessageToModal={dispatchMessageToModal}
                />
              </section>
            </div>
          </div>

          {/*<h3 className={'concerts__title'}>{'Available streams:'.toUpperCase()}:</h3>*/}
          {/*<h3 className={'concerts__title'}>{'Played in shows'.toUpperCase()}:</h3>*/}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      toggleShareExpansion,
      setPlayerItem,
      dispatchMessageToModal,
      setSpaPageName,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ExpandedItem);
