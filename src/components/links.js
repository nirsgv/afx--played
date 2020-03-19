import React from 'react';
import SvgSprite from './svgSprite';
import { imgData } from '../data/localImgData';
import { Link } from "react-router-dom";


function Awrap({children, value, wrap}) {
    return (
        wrap
            ? {children}
            : <a href={value} target="_blank">{children}</a>
    )
}


function LinkItem({value, platform, isPlayingEmbedded, cb, children}) {
    const { src, description } = imgData.sprite;
    return (


            <Awrap value={value} wrap={isPlayingEmbedded}>
            <li className={`links__link links__link--${platform} links__link--${!value ? 'in': ''}active`}
                onClick={cb && value && isPlayingEmbedded ? (e) => cb(e, value, platform) : null}
                data-target="internal"
            >
                <SvgSprite classes={`logo--${platform}`} src={src} alt={description} name={platform.toUpperCase()} />
                {children}
                </li>
            </Awrap>



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

    const {isPlayingEmbedded, setPlayerItem} = props;
    const {YOUTUBE, SPOTIFY, DEEZER, APPLE} = props.links;

    return (
        <nav className='links__wrap'>
            <ul className='links__list'>
                <LinkItem value={YOUTUBE} platform='youtube' isPlayingEmbedded={isPlayingEmbedded} cb={setPlayerItem}/>
                <LinkItem value={SPOTIFY} platform='spotify' isPlayingEmbedded={isPlayingEmbedded} cb={setPlayerItem}/>
                <LinkItem value={DEEZER} platform='deezer' isPlayingEmbedded={isPlayingEmbedded} cb={setPlayerItem}/>
                <LinkItem value={APPLE} platform='apple' isPlayingEmbedded={isPlayingEmbedded} cb={setPlayerItem}/>
                <NavButton value={true} platform={!props.isMountedByExpanded ? 'expand' : 'back'}>
                    {!props.isMountedByExpanded
                        ?   <Link to={`track/${props.ID}`} className={"btn btn--full-size href--expand"}>expand</Link>
                        :   <button onClick={props.history.length > 0 ? props.history.goBack : null} className={"btn btn--full-size href--go-back"}>back</button>
                    }
                </NavButton>
            </ul>
        </nav>
    )
}

export default Links;