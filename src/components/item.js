import React, { component } from 'react';

import Tags from './tags';
import Img from './img';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

//const DelayedImg = lazy(() => import('./img'));


// const alt = async() => {
//     let response = await fetch(`${window.location.origin}/api/sample`)
//     let body = await response.body;
//     let data = await body.getReader();
//     let readResponse = await data.read();
//     var blob = new Blob([readResponse.value], { type: 'audio/mp3' });
//     var url = window.URL.createObjectURL(blob);
//     window.audio = new Audio();
//     window.audio.src = url;
//     window.audio.play();
//     console.log(readResponse);
//     console.log(window.audio);
//     console.log(url);
//     return await readResponse;
// };

function NavButton({value, platform,  children}) {
    return (
        <li className={`links__link links__link--${platform} links__link--${!value ? 'in': ''}active`} >
            {children}
        </li>
    )
}

function Item({ trackData, setSampleId }) {
    const {
        ARTIST_NAME,
        ALBUM_TITLE,
        TRACK_TITLE,
        RECORD_LABEL,
        YEAR,
        GENRES,
        ID,
        // CAT,
        // LINKS,
        // DURATION,
        // IMAGES,
    } = trackData;
    return (
        <li className={`track`}>
            <div className="split-hori">
                <p className="track__text-wrap">
                    <h2 className="track__artist-name">{ARTIST_NAME}</h2>
                    <h2 className="track__track-title">{TRACK_TITLE}</h2>
                    <h3 className="track__album-title">{`${ALBUM_TITLE} ${RECORD_LABEL} ${YEAR}`}</h3>
                </p>

                <Img src={`../assets/album_covers/album_image_${ID}.jpg`}
                     alt={''}
                     transitionSeconds={3}
                     blockClassName={'track'} />
            </div>

            <Tags className="track__track-tags" tags={GENRES}/>

        <nav className='links__wrap'>
            <ul className='links__list'>
            <NavButton value={true} platform={'expand'}>
                <a className={"btn btn--full-size href--expand"} onClick={() => setSampleId(ID)}>Play sample</a>
            </NavButton>

            <NavButton value={true} platform={'expand'}>
                <Link to={`track/${ID}`} className={"btn btn--full-size href--expand"}>More Info</Link>
            </NavButton>
            </ul>
            </nav>  
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