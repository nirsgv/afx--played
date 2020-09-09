import React, { useEffect, useMemo, useState, useReducer } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Items from '../components/items';
import { hasMatchingText, inViewRange } from '../helpers/comparitors';
import { scrollTop } from '../helpers/dom';
import { checkIntroNecessity } from '../helpers/localStorage';
import {
  dispatchMessageToModal,
  toggleShareExpansion,
  setPlayerItem,
  setSpaPageName,
  resetBatch,
  filterByTagCb,
  cancelWelcomeIntro,
} from '../actions';
import FilterIndex from './filterIndex';
import WelcomeMessage from '../components/welcomeMessage';
import urlConstants from '../data/urlConstants';
import Splash from '../containers/splash';

const initialState = {
  trx: [],
  loader: false,
  entranceClassName: 'faded-in-from-bottom',
};

function reducer(state, action) {
  switch (action.type) {
    case 'setTrx':
      return { ...state, trx: action.payload };
    case 'setLoader':
      return { ...state, loader: action.payload };
    case 'setEntranceClassName':
      return { ...state, entranceClassName: action.payload };
    default:
      throw new Error();
  }
}

const Main = ({
  filteredByTags,
  filteredByPeriods,
  filteredBySearch,
  searchArtistNames,
  searchTrackTitles,
  searchAlbumTitles,
  itemsBatchAmt,
  batchNum,
  setSpaPageName,
  setPlayerItem,
  resetBatch,
  shouldPresentWelcomeIntro,
  cancelWelcomeIntro,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { trx, loader, entranceClassName } = state;
  useEffect(() => {
    setSpaPageName && setSpaPageName('home');
    checkIntroNecessity('afx-local_intro', cancelWelcomeIntro);
    resetBatch();
    scrollTop();
    mfasync({ filteredByTags, filteredByPeriods });
  }, [filteredByTags, filteredByPeriods]);

  const mfasync = async ({ filteredByTags, filteredByPeriods }) => {
    await dispatch({ type: 'setLoader', payload: true });
    await fetch(window.location.origin + '/api/taggedtracks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filteredByTags, filteredByPeriods }),
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: 'setTrx', payload: data }));
    dispatch({ type: 'setLoader', payload: false });
  };
  const checkboxActivated = {
    searchTrackTitles,
    searchArtistNames,
    searchAlbumTitles,
  };

  const memoRangeResult = useMemo(() => inViewRange(itemsBatchAmt, batchNum), [
    batchNum,
  ]);

  const tracksFiltered = useMemo(
    () => trx.filter(hasMatchingText(filteredBySearch, checkboxActivated)),
    [filteredBySearch, checkboxActivated, batchNum]
  );

  const tracksPaginated = tracksFiltered.filter(memoRangeResult);

  return (
    <>
      <FilterIndex itemsCount={tracksFiltered.length} />
      {!loader ? (
        <div
          className={`animate-content ${entranceClassName}`}
          onAnimationEnd={() =>
            dispatch({ type: 'setEntranceClassName', payload: 'true' })
          }
        >
          {shouldPresentWelcomeIntro && (
            <WelcomeMessage cancelWelcomeIntro={cancelWelcomeIntro} />
          )}
          <ul className='track-items track-items--animated'>
            <Items
              tracksFiltered={tracksFiltered}
              setPlayerItem={setPlayerItem}
            />
          </ul>
        </div>
      ) : (
        <Splash />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  filteredByTags: state.appData.filteredByTags,
  filteredByPeriods: state.appData.filteredByPeriods,
  filteredBySearch: state.appData.filteredBySearch,
  searchArtistNames: state.appData.searchArtistNames,
  searchTrackTitles: state.appData.searchTrackTitles,
  searchAlbumTitles: state.appData.searchAlbumTitles,
  itemsBatchAmt: state.appData.itemsBatchAmt,
  batchNum: state.appData.batchNum,
  shouldPresentWelcomeIntro: state.appData.shouldPresentWelcomeIntro,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      toggleShareExpansion,
      dispatchMessageToModal,
      setPlayerItem,
      setSpaPageName,
      resetBatch,
      filterByTagCb,
      cancelWelcomeIntro,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Main);
