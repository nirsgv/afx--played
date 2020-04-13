import React from 'react'
import SvgSprite from './svgSprite';
import { imgData } from '../data/localImgData';
import PropTypes from 'prop-types';

function Hamburger({menuIsClosed , className, alt, toggleMobMenu}) {

    const { src, description } = imgData.sprite;

    return (
        <div className={`main-nav__${className} ${className}__wrap`}>
            <button className={`${className}}__item button`} alt={alt} onClick={() => toggleMobMenu()}>
                <SvgSprite classes={'icon-logo'} src={src} alt={description} name={`${menuIsClosed ? 'HAMBURGER' : 'TIMES'}`} />
            </button>
        </div>

    )
}


Hamburger.propTypes = {
    menuIsClosed: PropTypes.bool,
    className: PropTypes.string,
    alt: PropTypes.string,
    toggleMobMenu: PropTypes.func,
};

export default Hamburger;