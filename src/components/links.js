import React from 'react';
import SvgSprite from './svgSprite';
import { imgData } from '../data/localImgData';
import List from "./list";


function Links(props) {

    const { setPlayerItem, ID } = props,
          { YOUTUBE, SPOTIFY, DEEZER, APPLE } = props.links,
          { src, description } = imgData.sprite;

    return (
        <nav className='links__wrap'>
            <div className={"internal-links"}>
                <button onClick={setPlayerItem && YOUTUBE ? (e) => setPlayerItem(e, YOUTUBE, 'YOUTUBE'.toLowerCase(), ID) : null}>
                    <SvgSprite classes={`logo--${'YOUTUBE'.toLowerCase()}`} src={src} alt={description} name={'YOUTUBE'} />
                </button>
            </div>
        </nav>
    )
}

export default Links;