import React from 'react';
import SvgSprite from './svgSprite';
import List from "./list";


function Links(props) {

    const { setPlayerItem, ID } = props,
          { YOUTUBE, SPOTIFY, DEEZER, APPLE } = props.links;

    return (
        <button onClick={YOUTUBE ? (e) => setPlayerItem(e, YOUTUBE, 'YOUTUBE'.toLowerCase(), ID) : null}>
            <SvgSprite classes={`logo--${'YOUTUBE'.toLowerCase()}`} name={'YOUTUBE'} />
        </button>
    )
}

export default Links;