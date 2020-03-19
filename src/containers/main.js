import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Item from '../components/item';
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

class Items extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        // do not rerender unless this specific property changed
        return nextProps.tracksFiltered !== this.props.tracksFiltered;
    }

    render(props) {
        console.log(this.props.tracksFiltered);
        return (
            <>
                {this.props.tracksFiltered.map((item, index) => {
                    return (
                        <Item key={index} trackData={item} isPlayingEmbedded={this.props.isPlayingEmbedded} setPlayerItem={this.props.setPlayerItem}/>
                    )
                })}
            </>
        )
    }
}

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