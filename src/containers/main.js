import React, { useEffect, useMemo, useState } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Items from '../components/items';
import { hasTags, withinPeriod, hasMatchingText, inViewRange } from '../helpers/comparitors';
import { combineByObjKeysArr } from '../helpers/str';
import { scrollTop } from '../helpers/dom';
import { checkIntroNecessity } from '../helpers/localStorage';
import { yearsMap } from '../data/periodMap.js';
import { dispatchMessageToModal, toggleShareExpansion, setPlayerItem, setSpaPageName,
         resetBatch, filterByTagCb, cancelWelcomeIntro } from "../actions";
import FilterIndex from './filterIndex';
import WelcomeMessage from '../components/welcomeMessage';

const Main = ({ filteredByTags,
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
                cancelWelcomeIntro
              }) => {

    useEffect(() => {
        setSpaPageName && setSpaPageName('home');
        checkIntroNecessity('afx-local_intro', cancelWelcomeIntro);
        resetBatch();
        scrollTop();
    }, [ filteredByTags, filteredByPeriods ]);

    const tracks = JSON.parse(localStorage.getItem("afx_local_tracks")).data;
    const [ entranceClassName, setEntranceClassName ] = useState('faded-in-from-bottom');


    const checkboxActivated = {
        searchTrackTitles,
        searchArtistNames,
        searchAlbumTitles
    };

    const memoPeriodResult = useMemo(() => combineByObjKeysArr(filteredByPeriods, yearsMap), [filteredByPeriods]);
    const memoTagsResult = useMemo(() => hasTags(filteredByTags), [filteredByTags]);
    const memoRangeResult = useMemo(() => inViewRange(itemsBatchAmt, batchNum), [batchNum]);

    const tracksFiltered = useMemo(() => Array.isArray(tracks)
        ? tracks && tracks
            .filter(memoTagsResult)
            .filter(withinPeriod(memoPeriodResult))
            .filter(hasMatchingText(filteredBySearch, checkboxActivated))
        : '', [filteredByTags, filteredByPeriods, filteredBySearch, checkboxActivated, batchNum]);

    const tracksPaginated = tracksFiltered.filter(memoRangeResult);

    return (
        <>
            <FilterIndex itemsCount={tracksFiltered.length}/>

            <div className={`animate-content ${entranceClassName}`} onAnimationEnd={() => setEntranceClassName('')}>
                {shouldPresentWelcomeIntro && <WelcomeMessage cancelWelcomeIntro={cancelWelcomeIntro}/>}
                <ul className="track-items track-items--animated">
                    <Items tracksFiltered={tracksPaginated} setPlayerItem={setPlayerItem} />
                </ul>
            </div>
        </>
    )
};


const mapStateToProps = state => ({
    filteredByTags: state.appData.filteredByTags,
    filteredByPeriods: state.appData.filteredByPeriods,
    filteredBySearch: state.appData.filteredBySearch,
    searchArtistNames: state.appData.searchArtistNames,
    searchTrackTitles: state.appData.searchTrackTitles,
    searchAlbumTitles: state.appData.searchAlbumTitles,
    itemsBatchAmt: state.appData.itemsBatchAmt,
    batchNum: state.appData.batchNum,
    shouldPresentWelcomeIntro: state.appData.shouldPresentWelcomeIntro
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleShareExpansion,
    dispatchMessageToModal,
    setPlayerItem,
    setSpaPageName,
    resetBatch,
    filterByTagCb,
    cancelWelcomeIntro
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);