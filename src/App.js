import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
    toggleGridListView, setPlayerItem, toggleShareExpansion, dispatchMessageToModal, viewMore,
    expandFilter, toggleMobMenu, toggleDesktopFilters, setTracksAsLocal, setShowsAsLocal, setSearchValue,
    setSpaPageName, setViewportDimensions, resetFilters
} from './actions';
import { useShadowAnimaStyle, useIsScrolled, useMedia } from './customHooks';
import { isBiggerFromMobile } from './helpers/dom'
import Main from './containers/main';
import About from './components/about';
import Splash from './containers/splash';
import List from './components/list';
import ViewPort from './components/viewport';
import SwitchButton from './components/switchButton';
import Editorial from './components/editorial';
import Filters from './containers/filters';
import Hamburger from './components/hamburger';
import ExpandedItem from './containers/expandedItem';
import ExpandedConcert from './containers/expandedConcert';
import MessagesModal from './containers/messagesModal';
import MultiPlayer from './containers/multiPlayer';
import SvgSprite from './components/svgSprite';
import { isBottomOfPage } from './helpers/dom';
import { debounce } from './helpers/higherFunctions';
import { fetchUnstoraged } from './helpers/localStorage';
import { imgData } from './data/localImgData';
import { Router, Switch, Route, Link, NavLink } from "react-router-dom";
import './styles/main.scss';
import { createBrowserHistory } from "history";
import { Helmet } from 'react-helmet';
import urlConstants from './data/urlConstants';
import InputBox from "./components/inputBox";
import AnimativeIndicator from "./components/animativeIndicator";
import { expClass } from './helpers/str'
import ReactGa from 'react-ga'
import DarkenLayer from "./components/darkenLayer";

const customHistory = createBrowserHistory();

const App = ({  ...restProps }) => {

    const {  expandFilter,
             toggleDesktopFilters,
             toggleMobMenu,
             setPlayerItem,
             toggleGridListView,
             setSearchValue,
             setViewportDimensions,
             resetFilters,
             viewMore,
             viewport,
             setTracksAsLocal,
             setShowsAsLocal,
             setSpaPageName,
             isGridView,
             isTracksDataLocal,
             isShowsDataLocal,
             isMobileMenuOpen,
             isDesktopFiltersExpanded,
             spaPageName,
             expandedFilter,
    } = restProps;

    const [ animateFooter, setAnimateFooter ] = useState(false);
    const getScrollItems = debounce(function(){ isBottomOfPage(this) && viewMore() }, 500);

    const customHookShadow = useShadowAnimaStyle(2, 4, 4);
    const customHcroll = useIsScrolled();
    const columnCount = useMedia(
        ['(min-width: 1360px)', '(min-width: 1020px)', '(min-width: 768px)'],
        [5, 4, 2],
        1
    );


    useEffect(() => {
        ReactGa.initialize('UA-163593216-1');
        ReactGa.pageview('/');
        ReactGa.event({
            category: 'clicked',
            action: 'simulated a button click'
        });
        window.addEventListener('scroll', getScrollItems);
        fetchUnstoraged(urlConstants.TRACKS_URL, 'afx_local_tracks', setTracksAsLocal);
        fetchUnstoraged(urlConstants.SHOWS_URL, 'afx_local_shows', setShowsAsLocal);
        return () => {
            window.removeEventListener('scroll', getScrollItems);
        }
    }, []);

    return (
        <div className={`app ${isGridView ? 'grid' : 'list'}-view`} data-test="component-app">
            <Helmet>
                <title>AFX Played</title>
                <meta name="description" content="This is the main page" />
                <meta name="keywords" content="aphex twin, afx, shows, setlist, tracks, performance, electronic, music" />
            </Helmet>
            {/*// render splash screen if no data is apparent yet, otherwise render router*/}
            <Splash />

            {isTracksDataLocal && isShowsDataLocal && (<Router history={customHistory}>

                    <header className={`header ${customHcroll ? 'scrolled' : ''}`}>
                        <nav className='main-nav'>
                            <div className='main-nav__logo'>
                                <Link to="/">
                                    <SvgSprite classes={'icon-logo'} src={imgData.sprite.src} alt={imgData.sprite.description} name={'APHEX'} style={customHookShadow}/>
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
                                    {/*<span onClick={() => {expandFilter('search');toggleDesktopFilters(true)}} className={`main-filters__item main-filters__item${expClass(expandedFilter,'search')}`}>Search</span>*/}
                                    <span className={'main-filters__item main-filters__item--hamburger'}>
                                        <Hamburger menuIsClosed={!isMobileMenuOpen} toggleMobMenu={toggleMobMenu} className={'hamburger'} />
                                    </span>



                                    {/*{columnCount > 1 ?*/}
                                        {/*(<span className={`main-filters__item main-filters__item--expansion-toggle ${isDesktopFiltersExpanded ? 'main-filters__item--expanded' : ''}`}>*/}
                                            {/*<button onClick={()=> toggleDesktopFilters()}>*/}
                                                {/*<SvgSprite classes={'icon-logo'} src={imgData.sprite.src} alt={imgData.sprite.description} name={'LONG_ARROW_LEFT'} />*/}
                                            {/*</button>*/}
                                        {/*</span>) : null}*/}
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

                    <DarkenLayer
                        isDesktopFiltersExpanded={isDesktopFiltersExpanded}
                        isMobileMenuOpen={isMobileMenuOpen}
                        cb1={toggleDesktopFilters}
                        cb2={toggleMobMenu}
                    />

                    <main className={`${spaPageName} faded-in-from-bottom`}>
                        <Switch>
                            <Route path="/about">
                                <About name={"about"} setSpaPageName={setSpaPageName}/>
                            </Route>
                            <Route path="/editorial">
                                <Editorial name={"editorial"} setSpaPageName={setSpaPageName}/>
                            </Route>
                            <Route path="/track/:id" component={ExpandedItem} setPlayerItem={setPlayerItem} />
                            <Route path="/concert/:id" component={ExpandedConcert} setPlayerItem={setPlayerItem} />
                            <Route path="/">
                                <List baseClassName="switch-modifiers">
                                    {isBiggerFromMobile(viewport.dimensions) && <SwitchButton Small={true} id={'isGridView'} Text={'isGridView'} labelText={"Grid view"} cb={toggleGridListView} val={isGridView} />}
                                    <SwitchButton Small={true} id={'isGridView'} Text={'isGridView'} labelText={"Grid view"} cb={toggleGridListView} val={isGridView} />
                                </List>
                                <InputBox classname={"main-search"} name="noname" placeholder="Search.." cb={(e) => setSearchValue(e)}>
                                    <SvgSprite classes={'main-search__icon'} src={imgData.sprite.src} alt={imgData.sprite.description} name={'SEARCH'} />
                                </InputBox>
                                <Main name={"something"} ></Main>
                            </Route>
                        </Switch>
                        <div className="push"></div>

                    </main>

                    <footer className={"footer"} >
                        <nav>
                            <List baseClassName="footer-nav" onClick={toggleMobMenu}>
                                <SvgSprite classes={''} src={imgData.sprite.src} alt={imgData.sprite.description} name={'APHEX'} />
                                <NavLink exact={true} activeClassName="active" to="/">Home</NavLink>
                                <NavLink activeClassName="active" to="/editorial">Editorial</NavLink>
                                <NavLink activeClassName="active" to="/about">About</NavLink>

                                <AnimativeIndicator animateFooter={animateFooter} setAnimateFooter={setAnimateFooter} />
                            </List>
                        </nav>
                    </footer>

                    <ViewPort setDimensionsCb={setViewportDimensions} viewport={viewport}>
                        <MultiPlayer />
                    </ViewPort>

                    <MessagesModal />

                </Router>)}
        </div>
    );
};

App.propTypes = {
    isGridView: PropTypes.bool,
    isTracksDataLocal: PropTypes.bool,
    isShowsDataLocal: PropTypes.bool,
    isMobileMenuOpen: PropTypes.bool,
    expandedFilter: PropTypes.string,
    isDesktopFiltersExpanded: PropTypes.bool,
    spaPageName: PropTypes.string,
    viewport: PropTypes.object,
};

const mapStateToProps = state => ({
    isGridView: state.appData.isGridView,
    isTracksDataLocal: state.appData.isTracksDataLocal,
    isShowsDataLocal: state.appData.isShowsDataLocal,
    isMobileMenuOpen: state.appData.isMobileMenuOpen,
    expandedFilter: state.appData.expandedFilter,
    isDesktopFiltersExpanded: state.appData.isDesktopFiltersExpanded,
    spaPageName: state.appData.spaPageName,
    viewport: state.viewport
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleGridListView,
    setPlayerItem,
    toggleShareExpansion,
    dispatchMessageToModal,
    viewMore,
    expandFilter,
    toggleMobMenu,
    toggleDesktopFilters,
    setTracksAsLocal,
    setShowsAsLocal,
    setSearchValue,
    setSpaPageName,
    setViewportDimensions,
    resetFilters
}, dispatch);

export const goHome = () => {
    //viewMore(false);
    if (customHistory.location.pathname !== '/') customHistory.push('/');
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);