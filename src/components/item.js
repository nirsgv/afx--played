import React from 'react';
import Tags from './tags';
import Links from './links';
import Img from './img';
import PropTypes from 'prop-types';

function Item({ trackData, isPlayingEmbedded, setPlayerItem }) {
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

                {/*<Link to={`track/${ID}`}>Expand</Link>*/}
                <Tags className="track__track-tags" tags={GENRES}/>
            </div>
            <Links className="track__track-links" links={LINKS} isPlayingEmbedded={isPlayingEmbedded} setPlayerItem={setPlayerItem} ID={ID} />

        </li>
    )
}

Item.defaultProps = {
    classname: 'track',
    value: '',
};

Item.propTypes = {
    trackData: PropTypes.object,
    isPlayingEmbedded: PropTypes.bool,
    setPlayerItem: PropTypes.func,
};

export default Item;