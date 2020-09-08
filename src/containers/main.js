import React, { useEffect, useMemo, useState } from 'react';
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
  useEffect(() => {
    setSpaPageName && setSpaPageName('home');
    checkIntroNecessity('afx-local_intro', cancelWelcomeIntro);
    resetBatch();
    scrollTop();

    fetch(window.location.origin + '/api/taggedtracks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filteredByTags, filteredByPeriods }),
    })
      .then((response) => response.json())
      .then((data) => setTrx(data));
  }, [filteredByTags, filteredByPeriods]);

  const [trx, setTrx] = useState([]);
  const tracks = JSON.parse(localStorage.getItem('afx_local_tracks')).data;
  const [entranceClassName, setEntranceClassName] = useState(
    'faded-in-from-bottom'
  );

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

      <div
        className={`animate-content ${entranceClassName}`}
        onAnimationEnd={() => setEntranceClassName('')}
      >
        {shouldPresentWelcomeIntro && (
          <WelcomeMessage cancelWelcomeIntro={cancelWelcomeIntro} />
        )}
        <ul className='track-items track-items--animated'>
          <Items
            tracksFiltered={tracksPaginated}
            setPlayerItem={setPlayerItem}
          />
        </ul>
      </div>
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
