import React from 'react'
import SvgSprite from './svgSprite';
import PropTypes from 'prop-types';

function Hamburger({menuIsClosed , className, alt, toggleMobMenu}) {


    return (
        <div className={`main-nav__${className} ${className}__wrap`}>
            <button className={`${className}__item button`} alt={alt} onClick={() => toggleMobMenu()}>
                <SvgSprite classes={'icon-logo'} name={`${menuIsClosed ? 'HAMBURGER' : 'TIMES'}`} />
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