import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Main from './containers/main';
import Header from './containers/header';
import About from './components/about';
import Splash from './containers/splash';
import Footer from './containers/footer';
import ViewPort from './components/viewport';
import Editorial from './components/editorial';
import ExpandedItem from './containers/expandedItem';
import ExpandedConcert from './containers/expandedConcert';
import MessagesModal from './containers/messagesModal';
import MultiPlayer from './containers/multiPlayer';
import { isBottomOfPage } from './helpers/dom';
import { debounce } from './helpers/higherFunctions';
import { fetchUnstoraged } from './helpers/localStorage';
import { Helmet } from 'react-helmet';
import urlConstants from './data/urlConstants';
import DarkenLayer from "./components/darkenLayer";
import Search from "./containers/search";
import './styles/main.scss';
import {
    toggleGridListView, setPlayerItem, dispatchMessageToModal, viewMore,
    toggleMobMenu, toggleDesktopFilters, setTracksAsLocal, setShowsAsLocal,
    setSpaPageName, setViewportDimensions, resetFilters
} from './actions';
import ReactGa from 'react-ga'
import List from './components/list';
import SwitchButton from './components/switchButton';

const customHistory = createBrowserHistory();

const App = ({  ...restProps }) => {

    const { toggleDesktopFilters, toggleMobMenu, setPlayerItem, setViewportDimensions, viewMore, viewport,
            setTracksAsLocal, setShowsAsLocal, setSpaPageName, isGridView, isTracksDataLocal, isShowsDataLocal,
            isMobileMenuOpen, isDesktopFiltersExpanded, spaPageName, toggleGridListView,
    } = restProps;

    const getScrollItems = debounce(function(){ isBottomOfPage(this) && viewMore() }, 100);

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

                    <Header />
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
                                <Editorial name={"editorial"} setSpaPageName={setSpaPageName} setPlayerItem={setPlayerItem}/>
                            </Route>
                            <Route path="/track/:id" component={ExpandedItem} setPlayerItem={setPlayerItem} />
                            <Route path="/concert/:id" component={ExpandedConcert} setPlayerItem={setPlayerItem} />
                            <Route path="/">
                                {/*<List baseClassName="switch-modifiers">*/}
                                    {/*{isBiggerFromMobile(viewport.dimensions) && <SwitchButton Small={true} id={'isGridView'} Text={'isGridView'} labelText={"Grid view"} cb={toggleGridListView} val={isGridView} />}*/}
                                    {/*<SwitchButton Small={true} id={'isGridView'} Text={'isGridView'} labelText={"Grid view"} cb={toggleGridListView} val={isGridView} />*/}
                                {/*</List>*/}

                                <Search />


                                <Main name={"tracks"}></Main>

                            </Route>
                        </Switch>
                        <div className="push"></div>

                    </main>

                    <Footer />

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
    isDesktopFiltersExpanded: state.appData.isDesktopFiltersExpanded,
    spaPageName: state.appData.spaPageName,
    viewport: state.viewport
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleGridListView, setPlayerItem, dispatchMessageToModal, viewMore, toggleMobMenu, toggleDesktopFilters,
    setTracksAsLocal, setShowsAsLocal, setSpaPageName, setViewportDimensions, resetFilters
}, dispatch);

export const goHome = () => {
    if (customHistory.location.pathname !== '/') customHistory.push('/');
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);