import React from 'react';
import Tags from './tags';
import Links from './links';
import Img from './img';
import PropTypes from 'prop-types';

//const DelayedImg = lazy(() => import('./img'));

function Item({ trackData, isPlayingEmbedded, setPlayerItem }) {
    const {
        ARTIST_NAME,
        ALBUM_TITLE,
        TRACK_TITLE,
        RECORD_LABEL,
        CAT,
        DURATION,
        YEAR,
        GENRES,
        LINKS,
        ID,
        IMAGES,
    } = trackData;
    return (
        <li className={`track`}>
            <div className="split-hori">
                <div className="track__text-wrap">
                    <h2 className="track__track-title">{TRACK_TITLE}</h2>
                    <h2 className="track__artist-name">{ARTIST_NAME}</h2>
                    <h2 className="track__album-title">{`${ALBUM_TITLE} ${RECORD_LABEL} ${YEAR}`}</h2>
                </div>

                <Img src={`../assets/album_covers/album_image_${ID}.jpg`}
                     alt={''}
                     transitionSeconds={3}
                     blockClassName={'track'}

                />
            </div>

            {/*<Link to={`track/${ID}`}>Expand</Link>*/}
            <Tags className="track__track-tags" tags={GENRES}/>
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