import React from 'react';
import Tags from './tags';
import Links from './links';
import Img from './img';

//const DelayedImg = lazy(() => import('./img'));


function Item(props) {
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
    } = props.trackData;
    return (
        <li className={`track`}>

            <div className="split-hori">
                <div className="track__text-wrap">
                    <h2 className="track__track-title">{TRACK_TITLE}</h2>
                    <h2 className="track__artist-name">{ARTIST_NAME}</h2>
                    <h2 className="track__album-title">{`${ALBUM_TITLE} ${RECORD_LABEL} ${YEAR}`}</h2>
                </div>


                <Img src={`../assets/album_covers/album_image_${ID}.jpg`}
                     placeholderImg={'https://flypaper.soundfly.com/wp-content/uploads/2018/07/aphex-header.jpg'}
                     alt={'https:/`/www.ucf.edu/files/2017/12/BIG-COLLAGE.jpg'}
                     transitionSeconds={3}
                     blockClassName={'track'}
                />
            </div>

            {/*<Link to={`track/${ID}`}>Expand</Link>*/}
            <Tags className="track__track-tags" tags={GENRES}/>


            <Links className="track__track-links" links={LINKS} isPlayingEmbedded={props.isPlayingEmbedded} setPlayerItem={props.setPlayerItem} ID={ID} />

        </li>
    )
}

export default Item;