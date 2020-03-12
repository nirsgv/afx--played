import React from 'react'
import SvgSprite from './svgSprite';
import { imgData } from '../data/localImgData';

export default ( {menuIsClosed , className, alt, toggleMobMenu} ) => {
    const { src, description } = imgData.sprite;

    return (
        <div className={`main-nav__${className} ${className}__wrap`}>
            <button className={`${className}}__item button`} alt={alt} onClick={() => toggleMobMenu()}>
                <SvgSprite classes={'icon-logo'} src={src} alt={description} name={`${menuIsClosed ? 'HAMBURGER' : 'TIMES'}`} />
            </button>
        </div>

    )
}