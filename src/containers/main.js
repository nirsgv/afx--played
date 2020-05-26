import React, { useEffect, useMemo } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Items from '../components/items';
import { hasTags, withinPeriod, hasMatchingText, inViewRange } from '../helpers/comparitors';
import { combineByObjKeysArr } from '../helpers/str';
import { yearsMap } from '../data/periodMap.js';
import {dispatchMessageToModal, toggleShareExpansion, setPlayerItem,  setSpaPageName, resetBatch} from "../actions";


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
                resetBatch
              }) => {

    useEffect(() => {
        resetBatch();
        setSpaPageName && setSpaPageName('home');
    }, []);

    const tracks = JSON.parse(localStorage.getItem("afx_local_tracks")).data;


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
            .filter(memoRangeResult)
        : '', [filteredByTags, filteredByPeriods, filteredBySearch, checkboxActivated, batchNum]);

    const filteredItems = <Items tracksFiltered={tracksFiltered} setPlayerItem={setPlayerItem} />;

    return (
        <>
            <ul className="track-items track-items--animated">
                { filteredItems }
            </ul>
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleShareExpansion,
    dispatchMessageToModal,
    setPlayerItem,
    setSpaPageName,
    resetBatch
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);