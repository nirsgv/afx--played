import React from 'react';
import SvgSprite from './svgSprite';
import { imgData } from '../data/localImgData';
import { Link } from "react-router-dom";


function Awrap({children, value, wrap}) {
    return (
        wrap
            ? <span>{children}</span>
            : <a href={value} target="blank">{children}</a>
    )
}


function LinkItem({value, platform, cb, children, ID}) {
    const { src, description } = imgData.sprite;
    return (


            <li className={`links__link links__link--${platform} links__link--${!value ? 'in': ''}active`}
                onClick={null}
                data-target="internal"
            >
                <Awrap value={value} >
                    <SvgSprite classes={`logo--${platform}`} src={src} alt={description} name={platform.toUpperCase()} />
                    {children}
                </Awrap>
            </li>



    )
}

function NavButton({value, platform,  children}) {

    return (
        <li className={`links__link links__link--${platform} links__link--${!value ? 'in': ''}active`} >
            {children}
        </li>
    )
}

function Links(props) {

    const {isPlayingEmbedded, setPlayerItem, ID} = props;
    const {YOUTUBE, SPOTIFY, DEEZER, APPLE} = props.links;

    return (
        <nav className='links__wrap'>
            <ul className='links__list'>
                <LinkItem value={YOUTUBE} platform='youtube' cb={setPlayerItem} ID={ID}/>
                <LinkItem value={SPOTIFY} platform='spotify' cb={setPlayerItem} ID={ID}/>
                <LinkItem value={DEEZER} platform='deezer' cb={setPlayerItem} ID={ID}/>
                <LinkItem value={APPLE} platform='apple' cb={setPlayerItem} ID={ID}/>
            </ul>
        </nav>
    )
}

export default Links;