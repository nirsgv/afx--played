import React, { useEffect, useMemo } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Items from '../components/items';
import { hasTags, withinPeriod, hasMatchingText, inViewRange } from '../helpers/comparitors';
import { combineByObjKeysArr } from '../helpers/str';
import { yearsMap } from '../data/periodMap.js';
import {dispatchMessageToModal, toggleShareExpansion, setPlayerItem, setPlayerType, setSpaPageName} from "../actions";


const Main = (props) => {

    useEffect(() => {
        console.log(setSpaPageName);
        props.setSpaPageName && props.setSpaPageName('home');
        return () => {

        }
    }, []);

    const tracks = JSON.parse(localStorage.getItem("afx_local_tracks")).data;

    const {
        filteredByTags,
        filteredByPeriods,
        filteredBySearch,
        searchArtistNames,
        searchTrackTitles,
        searchAlbumTitles,
        itemsBatchAmt,
        batchNum,
    } = props.appData;

    const checkboxActivated = {
        searchTrackTitles,
        searchArtistNames,
        searchAlbumTitles
    };

    const tracksFiltered = Array.isArray(tracks)
        ? tracks && tracks
            .filter(hasTags(filteredByTags))
            .filter(withinPeriod(combineByObjKeysArr(filteredByPeriods, yearsMap)))
            .filter(hasMatchingText(filteredBySearch, checkboxActivated))
            .filter(inViewRange(itemsBatchAmt, batchNum))
        : '';

    const child1 = useMemo(() => <Items tracksFiltered={tracksFiltered} isPlayingEmbedded={props.isPlayingEmbedded} setPlayerItem={props.setPlayerItem} />, [tracksFiltered]);

    return (
        <>
            <ul className="track-items track-items--animated">
                { child1 }
            </ul>
        </>
    )
};


const mapStateToProps = state => ({
    isPlayingEmbedded: state.player.isPlayingEmbedded,
    appData: state.appData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleShareExpansion,
    dispatchMessageToModal,
    setPlayerItem,
    setSpaPageName
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);