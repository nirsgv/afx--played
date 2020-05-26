import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import {expClass} from "../helpers/str";
import {imgData} from "../data/localImgData";
import {
    expandFilter, resetFilters, setSearchValue,
    toggleDesktopFilters, toggleMobMenu, toggleSearchOption,
} from "../actions/index";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {useIsScrolled, useShadowAnimaStyle, useMedia} from "../customHooks/index";
import { Link, NavLink } from "react-router-dom";
import SvgSprite from '../components/svgSprite';
import List from '../components/list';
import Filters from './filters';
import Hamburger from '../components/hamburger';
// const columnCount = useMedia(
//     ['(min-width: 1360px)', '(min-width: 1020px)', '(min-width: 768px)'],
//     [5, 4, 2],
//     1
// );

const Header = (props) => {

    const customHookShadow = useShadowAnimaStyle(2, 4, 4),
          customHcroll = useIsScrolled();

    const {
        isMobileMenuOpen,
        expandedFilter,
        isDesktopFiltersExpanded,
        expandFilter,
        toggleMobMenu,
        toggleDesktopFilters,
        resetFilters
    } = props;

    return (
        <header className={`header ${customHcroll ? 'scrolled' : ''}`}>
            <nav className='main-nav'>
                <div className='main-nav__logo'>
                    <Link to="/">
                        <SvgSprite classes={'icon-logo'} src={imgData.sprite.src} alt={imgData.sprite.description} name={'APHEX'}
                                   style={customHookShadow}
                        />
                    </Link>
                </div>
                <List baseClassName="main-nav">
                    <NavLink exact={true} activeClassName="active" to="/">Tracks</NavLink>
                    <NavLink activeClassName="active" to="/editorial">Editorial</NavLink>
                    <NavLink activeClassName="active" to="/about">About</NavLink>
                </List>
                <Hamburger menuIsClosed={!isMobileMenuOpen} toggleMobMenu={toggleMobMenu} className={'hamburger'}/>
            </nav>
            <div className={`nav-slide ${isMobileMenuOpen ? 'nav-slide--open' : ''}`} data-test="nav-slide">
                <nav className="main-filters">
                    <List baseClassName="main-filters">
                                    <span>

                                    <button onClick={()=> toggleDesktopFilters()}>
                                        <SvgSprite classes={'icon-logo'} src={imgData.sprite.src} alt={imgData.sprite.description} name={'FUNNEL'} />
                                    </button>
                                    </span>
                        <span onClick={() => {expandFilter('genres');toggleDesktopFilters(true)}} className={`main-filters__item main-filters__item${expClass(expandedFilter,'genres')}`}>Style</span>
                        <span>/</span>
                        <span onClick={() => {expandFilter('years');toggleDesktopFilters(true)}} className={`main-filters__item main-filters__item${expClass(expandedFilter,'years')}`}>Decade</span>
                        <span className={'main-filters__item main-filters__item--hamburger'}>
                                        <Hamburger menuIsClosed={!isMobileMenuOpen} toggleMobMenu={toggleMobMenu} className={'hamburger'} />
                                    </span>

                    </List>
                </nav>

                <nav className={`filter-expansion__wrap filter-expansion__wrap${!isDesktopFiltersExpanded ? '--close' : '--open'}`}>
                    <button className="filter-expansion__clear-all-button button" onClick={resetFilters}>
                        <span>Clear all</span>
                        <SvgSprite classes={'icon-logo'} src={imgData.sprite.src} alt={imgData.sprite.description} name={'MINUS--LIGHT'} />
                    </button>

                    <Filters />
                    <button className="filter-expansion__close-button" onClick={() => toggleDesktopFilters(false)}>
                        <SvgSprite classes={'icon-logo'} src={imgData.sprite.src} alt={imgData.sprite.description} name={'TIMES'} />
                    </button>
                </nav>
            </div>
        </header>
    );

};

Header.defaultProps = {

};

Header.propTypes = {

};


const mapStateToProps = state => ({
    isMobileMenuOpen: state.appData.isMobileMenuOpen,
    expandedFilter: state.appData.expandedFilter,
    isDesktopFiltersExpanded: state.appData.isDesktopFiltersExpanded,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setSearchValue,
    toggleSearchOption,
    expandFilter,
    toggleMobMenu,
    toggleDesktopFilters,
    resetFilters
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);