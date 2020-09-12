import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import {
  toggleShareExpansion,
  setPlayerItem,
  setSpaPageName,
} from '../actions/index';
import { connect } from 'react-redux';
import { getMonthFromShort, getDurationFromSeconds } from '../helpers/str';
import { Link } from 'react-router-dom';
import { scrollTop } from '../helpers/dom';
import BackButton from '../components/backButton';
import MoreInfoButton from '../components/moreInfoButton';

const ExpandedConcert = ({ match, history }) => {
  const [entranceClassName, setEntranceClassName] = useState(
    'faded-in-from-bottom'
  );
  //   const concertId = decodeURIComponent(match.params.id);
  const [concert, setConcert] = useState({
    SHOW_ID: '',
    SHOW_TITLE: '',
    SHOW_DATE: {
      DAY: '',
      MONTH: '',
      YEAR: '',
    },
    SHOW_LOCATION: {
      COUNTRY: '',
      CITY: '',
      VENUE: '',
      SHOW_GEO: {
        LAT: 0,
        LNG: 0,
      },
    },
  });

  const [loader, setLoader] = useState(false);
  const [associatedTracks, setAssociatedTracks] = useState([]);

  useEffect(() => {
    setSpaPageName('expanded-concert');
    scrollTop();

    fetchConcert(match.params.id);
    fetchAssociatedTracks(match.params.id);
  }, [match.params.id]);

  const fetchConcert = async (concertId) => {
    await setLoader(true);
    await fetch(window.location.origin + '/api/show/' + concertId)
      .then((response) => response.json())
      .then((data) => {
        setConcert(data[0]);
      });
    setLoader(false);
  };

  // new call to tracks controller

  const fetchAssociatedTracks = async (concertId) => {
    await fetch(
      window.location.origin + '/api/tracksplayedinconcert/' + concertId
    )
      .then((response) => response.json())
      .then((data) => setAssociatedTracks(data));
  };
  //     tracksCollected = tracks.filter((track) => track.VENUES.includes(id));

  const { SHOW_TITLE, SHOW_LOCATION, SHOW_DATE } = concert;

  return (
    <div className={'inner-page__wrap'}>
      <nav className='back-btn__wrap expanded-item__back'>
        <BackButton history={history} className={'back-btn'} />
      </nav>
      <div
        className={`animate-content ${entranceClassName}`}
        onAnimationEnd={() => setEntranceClassName('')}
      >
        <div className={'inner-page__inner'}>
          <h1 className='expanded-concert__title'>{SHOW_TITLE}</h1>
          <h2 className='expanded-concert__location'>
            {`${SHOW_LOCATION.COUNTRY} ${SHOW_LOCATION.CITY} ${
              SHOW_LOCATION.VENUE
            }, ${SHOW_DATE.DAY} ${getMonthFromShort(SHOW_DATE.MONTH)} ${
              SHOW_DATE.YEAR
            }`}
          </h2>
          <h3 className='expanded-concert__date'></h3>
        </div>
        <ul className={'expanded-concert__list'}>
          {Array.isArray(associatedTracks) &&
            associatedTracks.map((item, index) => {
              return (
                <li key={index} className={'expanded-concert__item'}>
                  <Link
                    className={'expanded-concert__link'}
                    to={`/track/${item.ID}`}
                  >
                    <h3>
                      <div className='concert-tracks concert-tracks__row'>
                        <span className='concert-tracks__artist'>
                          {item.ARTIST_NAME}
                        </span>
                        <div>
                          <span className='concert-tracks__title'>
                            {item.TRACK_TITLE}
                          </span>
                          <span className='concert-tracks__duration'>
                            , {getDurationFromSeconds(item.DURATION)}
                          </span>
                        </div>
                        <MoreInfoButton />
                      </div>
                    </h3>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      toggleShareExpansion,
      setPlayerItem,
      setSpaPageName,
    },
    dispatch
  );

export default connect(mapDispatchToProps)(ExpandedConcert);
