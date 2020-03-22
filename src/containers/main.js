import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Items from '../components/items';
import { hasTags, withinPeriod, hasMatchingText, inViewRange } from '../helpers/comparitors';
import { combineByObjKeysArr } from '../helpers/str';
import { yearsMap } from '../data/periodMap.js';
import { dispatchMessageToModal, toggleShareExpansion, setPlayerItem , setPlayerType } from "../actions";


const Main = (props) => {

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

    return (
        <>
            <ul className="track-items track-items--animated">
                <Items tracksFiltered={tracksFiltered} isPlayingEmbedded={props.isPlayingEmbedded} setPlayerItem={props.setPlayerItem} />
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
    setPlayerItem
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);