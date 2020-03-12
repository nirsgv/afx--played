import React, { Component, useState, useEffect } from 'react';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import {
    toggleGridListView,
    toggleEmbeddedPlay,
    setPlayerItem,
    toggleShareExpansion,
    dispatchMessageToModal,
    viewMore,
    expandFilter,
    toggleMobMenu,
    toggleDesktopFilters,
    setTracksAsLocal,
    setShowsAsLocal,
} from './actions';

import Main from './containers/main';
import About from './components/about';
import Splash from './components/splash';
import ViewPort from './components/viewport';
import Filters from './containers/filters';
import Hamburger from './components/hamburger';
import ExpandedItem from './containers/expandedItem';
import ExpandedConcert from './containers/expandedConcert';
import MessagesModal from './containers/messagesModal';
import MultiPlayer from './containers/multiPlayer';
import SvgSprite from './components/svgSprite';
import { isBottomOfPage } from './helpers/dom';
import { debounce } from './helpers/higherFunctions';
import { updatedLocalStorageIfNeeded } from './helpers/localStorage';
import { imgData } from './data/localImgData';
import {
    Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import './styles/main.scss';
import { createBrowserHistory } from "history";
import { Helmet } from 'react-helmet';
import urlConstants from './data/urlConstants';
const customHistory = createBrowserHistory();


const App = (props) => {

    const getScrollItems = debounce(function(){ isBottomOfPage(this) && props.viewMore() }, 100);

    useEffect(() => {
        window.addEventListener('scroll', getScrollItems);
        updatedLocalStorageIfNeeded(window.location.origin + urlConstants.TRACKS_URL, 'afx_local_tracks', props.setTracksAsLocal);
        updatedLocalStorageIfNeeded(window.location.origin + urlConstants.SHOWS_URL, 'afx_local_shows', props.setShowsAsLocal);

        return () => {
            window.removeEventListener('scroll', getScrollItems);
        }
    }, []);


    const { expandFilter, toggleDesktopFilters, appData, toggleMobMenu } = props;


    return (
        <div className={`app ${appData.isGridView ? 'grid' : 'list'}-view`} data-test="component-app">

            <Helmet>
                <title>Put title here...</title>
                <meta name="description" content="This is the main page" />
                <meta name="keywords" content="aphex twin, afx, shows, setlist, tracks, performance, electronic, music" />
            </Helmet>
            {/*// render splash screen if no data is apparent yet, otherwise render router*/}


                <Splash isTracksDataLocal={appData.isTracksDataLocal} isShowsDataLocal={appData.isShowsDataLocal}/>
            {appData.isTracksDataLocal && appData.isShowsDataLocal &&
                (<Router history={customHistory}>
                    <header className="App-header">
                        <nav className='main-nav'>
                            <div className='main-nav__logo'>
                                <Link to="/">
                                    <SvgSprite classes={'icon-logo'} src={imgData.sprite.src} alt={imgData.sprite.description} name={'APHEX'} />
                                </Link>
                            </div>
                            <ul className='main-nav__list'>

                                <li className='main-nav__item'>
                                    <Link to="/about">About</Link>
                                </li>

                            </ul>
                            <Hamburger menuIsClosed={!appData.isMobileMenuOpen} toggleMobMenu={toggleMobMenu} className={'hamburger'}/>
                        </nav>

                        <div className="nav-slide" className={`nav-slide ${appData.isMobileMenuOpen ? 'nav-slide--open' : ''}`} data-test="nav-slide">
                            <nav className="main-filters">
                                <ul className="main-filters__list">
                                    <li onClick={() => {expandFilter('genres');toggleDesktopFilters(true)}} className={`main-filters__item main-filters__item${appData.expandedFilter === 'genres' ? '--on' : ''}`}>Genres</li>
                                    <li onClick={() => {expandFilter('years');toggleDesktopFilters(true)}} className={`main-filters__item main-filters__item${appData.expandedFilter === 'years' ? '--on' : ''}`}>Years</li>
                                    <li onClick={() => {expandFilter('search');toggleDesktopFilters(true)}} className={`main-filters__item main-filters__item${appData.expandedFilter === 'search' ? '--on' : ''}`}>Search</li>
                                    <li className={'main-filters__item main-filters__item--hamburger'}>
                                        <Hamburger menuIsClosed={!appData.isMobileMenuOpen} toggleMobMenu={toggleMobMenu} className={'hamburger'} />
                                    </li>
                                    <li className={'main-filters__item main-filters__item--desktop-filters-expansion-toggle'}>
                                        <button onClick={()=> toggleDesktopFilters()}>
                                            click
                                        </button>
                                    </li>

                                </ul>

                            </nav>

                            <nav className={`filter-expansion__wrap filter-expansion__wrap${!appData.isDesktopFiltersExpanded ? '--close' : '--open'}`}>
                                <Filters />
                                <div className="filter-expansion__close-button" onClick={() => toggleDesktopFilters(false)}>
                                    {/*Close*/}
                                    <SvgSprite classes={'icon-logo'} src={imgData.sprite.src} alt={imgData.sprite.description} name={'TIMES'} />
                                </div>
                            </nav>
                        </div>

                    </header>


                    <main className={`a`}>
                        <Switch>
                            <Route path="/about">
                                <About name={"something"} />
                            </Route>

                            <Route path="/track/:id" component={ExpandedItem} setPlayerItem={props.setPlayerItem}/>
                            <Route path="/concert/:id" component={ExpandedConcert} setPlayerItem={props.setPlayerItem}/>

                            <Route path="/">
                                <ul className="main-modifiers__list">
                                    <li>
                                        <button onClick={() => props.toggleGridListView()}>toggleGridListView</button>
                                    </li>
                                    <li>
                                        <button onClick={() => props.toggleEmbeddedPlay()}>toggleEmbeddedPlay</button>
                                    </li>
                                </ul>
                                <Main name={"something"} ></Main>
                            </Route>


                        </Switch>
                    </main>

                    <footer>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <button onClick={() => props.toggleGridListView()}>toggleGridListView button</button>
                            </ul>
                        </nav>
                    </footer>

                    <ViewPort>
                        <MultiPlayer />
                    </ViewPort>

                    <MessagesModal />



                </Router>)}


        </div>
    );
};

const mapStateToProps = state => ({
    appData: state.appData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleGridListView,
    toggleEmbeddedPlay,
    setPlayerItem,
    toggleShareExpansion,
    dispatchMessageToModal,
    viewMore,
    expandFilter,
    toggleMobMenu,
    toggleDesktopFilters,
    setTracksAsLocal,
    setShowsAsLocal
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);