import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Tags from './tags';
import Links from './links';
import Img from './img';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import List from "./list";
import SvgSprite from './svgSprite';
import { expandFilter, filterByPeriodCb, filterByTagCb } from "../actions";
import MoreInfoButton from "./moreInfoButton";

function Item({ trackData, setPlayerItem, filterByTagCb }) {
    const {
        ARTIST_NAME,
        TRACK_TITLE,
        YEAR,
        GENRES,
        LINKS,
        ID,
        ALBUM_ID
    } = trackData;
    return (
        <li className={`track`}>
            <div className="track__body">
                <div className="track__header">
                    <p className="track__text-wrap">
                        <span className="track__artist-name">{ARTIST_NAME}</span>
                        <span className="track__track-title">{TRACK_TITLE}</span>
                        <span className="track__album-title">{`${YEAR}`}</span>
                    </p>

                    <Img src={`../assets/album_covers/160x160pp/${ALBUM_ID}.jpg`}
                         alt={''}
                         transitionSeconds={3}
                         blockClassName={'track'}
                    />

                </div>

                <Tags className="track__track-tags" tags={GENRES} tagCb={(tag) => filterByTagCb(tag)}/>
            </div>

            <List baseClassName={"internal-links"}>
                <Links className="track__track-links" links={LINKS} platform={'YOUTUBE'} setPlayerItem={setPlayerItem} ID={ID} />
                <MoreInfoButton ID={ID}/>

            </List>

        </li>
    )
}

Item.defaultProps = {
    classname: 'track',
    value: '',
};

Item.propTypes = {
    trackData: PropTypes.object,
    setPlayerItem: PropTypes.func,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
    filterByTagCb,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item);