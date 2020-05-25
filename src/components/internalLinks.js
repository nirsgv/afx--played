import React from 'react';
import SvgSprite from './svgSprite';
import {imgData} from '../data/localImgData';
import List from "./list";


function InternalLinks(props) {

    const {links} = props;
    const {src, description} = imgData.sprite;

    const linksOrdered = Object.assign({}, {
        YOUTUBE: links.YOUTUBE
    });

    console.log(linksOrdered);

    return (
        <List baseClassName={"internal-links"}>
            {linksOrdered &&
            typeof linksOrdered === 'object' &&
            Object.keys(linksOrdered).map(platform => {
                let link = linksOrdered[platform];
                return (
                <span className={`links__link links__link--${platform}`}
                    onClick={(e) => props.setPlayerItem && link  ? props.setPlayerItem(e, link, platform, props.ID) : null}
                >
                    <SvgSprite classes={`logo--${platform}`} src={src} alt={description} name={platform.toUpperCase()} />
                </span>
            )}
        )}
        </List>
    )
}

export default InternalLinks;