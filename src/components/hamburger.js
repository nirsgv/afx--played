import React from 'react'
import SvgSprite from './svgSprite';
import PropTypes from 'prop-types';

function Hamburger({ menuIsClosed , className, alt, toggleMobMenu, toggleDesktopFilters }) {


    const closeAll = () => {
        toggleMobMenu();
        toggleDesktopFilters(false);
    };
// console.log({toggleDesktopFilters});
// todo: check why this is rendering
    return (
        <div className={`main-nav__${className} ${className}__wrap`}>
            <button className={`${className}__item button`} alt={alt} onClick={closeAll}>
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
    toggleDesktopFilters: PropTypes.func,
};

export default Hamburger;