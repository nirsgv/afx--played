import React from 'react';
import PropTypes from 'prop-types';
import { expClass } from '../helpers/str';
import { imgData } from '../data/localImgData';
import {
  expandFilter,
  resetFilters,
  setSearchValue,
  toggleDesktopFilters,
  toggleMobMenu,
  toggleSearchOption,
} from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  useIsScrolled,
  useShadowAnimaStyle,
  useMedia,
} from '../customHooks/index';
import { Link, NavLink } from 'react-router-dom';
import SvgSprite from '../components/svgSprite';
import List from '../components/list';
import Filters from './filters';
import Hamburger from '../components/hamburger';
import ClearAllButton from '../components/clearAllButton';
// const columnCount = useMedia(
//     ['(min-width: 1360px)', '(min-width: 1020px)', '(min-width: 768px)'],
//     [5, 4, 2],
//     1
// );

const Header = (props) => {
  // const customHookShadow = useShadowAnimaStyle(2, 4, 4);
  const customHcroll = useIsScrolled();

  const {
    isMobileMenuOpen,
    expandedFilter,
    isDesktopFiltersExpanded,
    expandFilter,
    toggleMobMenu,
    toggleDesktopFilters,
    resetFilters,
    filteredByTags,
    filteredByPeriods,
    filteredBySearch,
  } = props;
  //   console.log({ toggleDesktopFilters });
  return (
    <header
      className={`header header--${customHcroll ? 'minified' : 'expanded'}`}
    >
      <nav className='main-nav'>
        <div className='main-nav__logo'>
          <Link to='/'>
            <SvgSprite
              classes={'icon-logo'}
              name={'APHEX'}
              // style={customHookShadow}
            />
          </Link>
        </div>
        <List baseClassName='main-nav' printBase={false}>
          <NavLink exact={true} activeClassName='active' to='/'>
            Tracks
          </NavLink>
          <NavLink activeClassName='active' to='/editorial'>
            Editorial
          </NavLink>
          <NavLink activeClassName='active' to='/about'>
            About
          </NavLink>
        </List>
        <Hamburger
          menuIsClosed={!isMobileMenuOpen}
          toggleMobMenu={toggleMobMenu}
          toggleDesktopFilters={toggleDesktopFilters}
          className={'hamburger'}
        />
      </nav>
      <div
        className={`nav-slide ${isMobileMenuOpen ? 'nav-slide--open' : ''}`}
        data-test='nav-slide'
      >
        <nav
          className={`main-filters main-filters--${
            isDesktopFiltersExpanded || isMobileMenuOpen
              ? 'expanded'
              : 'minified'
          }`}
        >
          <List baseClassName='main-filters'>
            <button
              onClick={() => toggleDesktopFilters()}
              className={`funnel-button funnel-button--${
                isDesktopFiltersExpanded || isMobileMenuOpen ? 'open' : 'closed'
              }`}
            >
              <SvgSprite name={'FUNNEL'} />
            </button>

            <span
              onClick={() => {
                expandFilter('genres');
                toggleDesktopFilters(true);
              }}
              className={`main-filters__item main-filters__item${expClass(
                expandedFilter,
                'genres'
              )}`}
            >
              Style
            </span>
            <span>/</span>
            <span
              onClick={() => {
                expandFilter('years');
                toggleDesktopFilters(true);
              }}
              className={`main-filters__item main-filters__item${expClass(
                expandedFilter,
                'years'
              )}`}
            >
              Decade
            </span>
            <span
              className={'main-filters__item main-filters__item--hamburger'}
            >
              <Hamburger
                menuIsClosed={!isMobileMenuOpen}
                toggleMobMenu={toggleMobMenu}
                className={'hamburger'}
                toggleDesktopFilters={toggleDesktopFilters}
              />
            </span>
          </List>
        </nav>

        <nav
          className={`filter-expansion__wrap filter-expansion__wrap${
            !isDesktopFiltersExpanded ? '--close' : '--open'
          }`}
        >
          <div className='clear-button__wrap'>
            <ClearAllButton
              filteredByTags={filteredByTags}
              filteredByPeriods={filteredByPeriods}
              filteredBySearch={filteredBySearch}
              clickCb={resetFilters}
            />
          </div>
          <Filters />
          <button
            className='filter-expansion__close-button'
            onClick={() => toggleDesktopFilters(false)}
          >
            <SvgSprite alt={imgData.sprite.description} name={'TIMES'} />
          </button>
        </nav>
      </div>
    </header>
  );
};

Header.defaultProps = {};

Header.propTypes = {};

const mapStateToProps = (state) => ({
  isMobileMenuOpen: state.appData.isMobileMenuOpen,
  expandedFilter: state.appData.expandedFilter,
  isDesktopFiltersExpanded: state.appData.isDesktopFiltersExpanded,
  filteredByTags: state.appData.filteredByTags,
  filteredByPeriods: state.appData.filteredByPeriods,
  filteredBySearch: state.appData.filteredBySearch,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSearchValue,
      toggleSearchOption,
      expandFilter,
      toggleMobMenu,
      toggleDesktopFilters,
      resetFilters,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Header);
