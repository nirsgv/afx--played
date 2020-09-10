import React, {
  useEffect,
  useMemo,
  useState,
  useReducer,
  forwardRef,
} from 'react';
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
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const initialState = {
  trx: [],
  trxIds: [],
  loader: false,
  entranceClassName: 'faded-in-from-bottom',
};

function reducer(state, action) {
  switch (action.type) {
    case 'setTrx':
      return { ...state, trx: action.payload };
    case 'setTrxIds':
      return { ...state, trxIds: action.payload };
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
  const { trx, trxIds, loader, entranceClassName } = state;
  useEffect(() => {
    setSpaPageName && setSpaPageName('home');
    checkIntroNecessity('afx-local_intro', cancelWelcomeIntro);
    resetBatch();
    scrollTop();
    mfasync({ filteredByTags, filteredByPeriods });
  }, [filteredByTags, filteredByPeriods]);

  const mfasync = async ({ filteredByTags, filteredByPeriods }) => {
    await dispatch({ type: 'setLoader', payload: true });
    await fetch(window.location.origin + '/api/filteredtrackids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filteredByTags, filteredByPeriods }),
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: 'setTrxIds', payload: data }));
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
            <Items trxIds={trxIds} setPlayerItem={setPlayerItem} />
          </ul>
        </div>
      ) : (
        <Splash />
      )}
    </>
  );
};

const chunk = (arr, size) =>
  arr.reduce(
    (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
    []
  );

// const trxChunked = chunk(trx, 3);
const GUTTER_SIZE = 5;
const COLUMN_WIDTH = 400;
const ROW_HEIGHT = 200;

const Cell = ({ columnIndex, rowIndex, style, trackdata }) => (
  <div
    className={'GridItem'}
    style={{
      ...style,
      left: style.left + GUTTER_SIZE,
      top: style.top + GUTTER_SIZE,
      width: style.width - GUTTER_SIZE,
      height: style.height - GUTTER_SIZE,
    }}
  >
    {/* {trxChunked[rowIndex][columnIndex]} */}
    {/* <Item trackdata={trackdata} /> */}r{rowIndex}, c{columnIndex}
  </div>
);

const Example = () => (
  <AutoSizer>
    {({ height, width }) => (
      <Grid
        className='Grid'
        columnCount={4}
        columnWidth={COLUMN_WIDTH + GUTTER_SIZE}
        height={height}
        innerElementType={innerElementType}
        rowCount={100}
        rowHeight={ROW_HEIGHT + GUTTER_SIZE}
        width={width}
      >
        {Cell}
      </Grid>
    )}
  </AutoSizer>
);

const innerElementType = forwardRef(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      paddingLeft: GUTTER_SIZE,
      paddingTop: GUTTER_SIZE,
    }}
    {...rest}
  />
));

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
