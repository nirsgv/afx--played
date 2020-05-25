import React from 'react';
import SvgSprite from './svgSprite';
import {imgData} from '../data/localImgData';
import List from "./list";


function ExternalLinks(props) {

    const {links} = props;
    const { src, description } = imgData.sprite;

    const linksOrdered = Object.assign({}, {
        YOUTUBE: links.YOUTUBE,
        SPOTIFY: links.SPOTIFY,
        APPLE: links.APPLE,
        DEEZER: links.DEEZER
    });

    return (
        <nav className='links__wrap'>
            <List baseClassName={"external-links"}>
                {linksOrdered &&
                typeof linksOrdered === 'object' &&
                Object.keys(linksOrdered).map(platform => {
                        let link = linksOrdered[platform];
                        return (
                            <a href={link} target="blank" className={"external-links__link"}>
                                <SvgSprite classes={`logo--${platform.toLowerCase()}`}
                                           src={src} alt={platform}
                                           name={platform} />
                            </a>
                        )
                    }
                )}
            </List>
        </nav>
    )
}

export default ExternalLinks;