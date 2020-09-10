import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import ReactGa from 'react-ga';
import MultiPlayer from './containers/multiPlayer';
import Main from './containers/main';
import ExpandedConcert from './containers/expandedConcert';
import Search from './containers/search';
import Header from './containers/header';
import ExpandedItem from './containers/expandedItem';
import Footer from './containers/footer';
import MessagesModal from './containers/messagesModal';
import Editorial from './components/editorial';
import About from './components/about';
import { isBottomOfPage } from './helpers/dom';
import { debounce } from './helpers/higherFunctions';
import ViewPort from './components/viewport';
import DarkenLayer from './components/darkenLayer';
import './styles/main.scss';

import {
  setMapAsLoaded,
  setPlayerItem,
  dispatchMessageToModal,
  viewMore,
  toggleMobMenu,
  toggleDesktopFilters,
  setTracksAsLocal,
  setShowsAsLocal,
  setSpaPageName,
  setViewportDimensions,
  resetFilters,
} from './actions';
const customHistory = createBrowserHistory();

const App = ({ ...restProps }) => {
  const {
    toggleDesktopFilters,
    toggleMobMenu,
    setPlayerItem,
    setViewportDimensions,
    viewMore,
    viewport,
    setSpaPageName,
    isGridView,
    isMobileMenuOpen,
    isDesktopFiltersExpanded,
    spaPageName,
    mapHasLoaded,
    setMapAsLoaded,
  } = restProps;

  const getScrollItems = debounce(function () {
    isBottomOfPage(this) && viewMore();
  }, 100);

  useEffect(() => {
    ReactGa.initialize('UA-163593216-1');
    ReactGa.pageview('/');
    ReactGa.event({
      category: 'clicked',
      action: 'simulated a button click',
    });
    window.addEventListener('scroll', getScrollItems);

    return () => {
      window.removeEventListener('scroll', getScrollItems);
    };
  }, []);

  return (
    <div
      className={`app ${isGridView ? 'grid' : 'list'}-view`}
      data-test='component-app'
    >
      <Helmet>
        <title>AFX Played Info</title>
        <meta name='description' content='This is the main page' />
        <meta
          name='keywords'
          content='aphex twin, afx, shows, setlist, tracks, performance, electronic, music'
        />
      </Helmet>

      <Router history={customHistory}>
        <Header />
        <DarkenLayer
          isDesktopFiltersExpanded={isDesktopFiltersExpanded}
          isMobileMenuOpen={isMobileMenuOpen}
          cb1={toggleDesktopFilters}
          cb2={toggleMobMenu}
        />

        <main className={`${spaPageName}`}>
          <Switch>
            <Route path='/about'>
              <About
                name={'about'}
                setSpaPageName={setSpaPageName}
                history={customHistory}
                setMapAsLoaded={setMapAsLoaded}
                mapHasLoaded={mapHasLoaded}
              />
            </Route>
            <Route path='/editorial'>
              <Editorial
                name={'editorial'}
                setSpaPageName={setSpaPageName}
                setPlayerItem={setPlayerItem}
                history={customHistory}
              />
            </Route>
            <Route
              path='/track/:id'
              component={ExpandedItem}
              setPlayerItem={setPlayerItem}
            />
            <Route
              path='/concert/:id'
              component={ExpandedConcert}
              setPlayerItem={setPlayerItem}
            />
            <Route path='/'>
              <Search />
              <Main />
            </Route>
          </Switch>
          <div className='push'></div>
        </main>

        <Footer />

        <ViewPort setDimensionsCb={setViewportDimensions} viewport={viewport}>
          <MultiPlayer />
        </ViewPort>

        <MessagesModal />
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isGridView: state.appData.isGridView,
  isTracksDataLocal: state.appData.isTracksDataLocal,
  isShowsDataLocal: state.appData.isShowsDataLocal,
  isMobileMenuOpen: state.appData.isMobileMenuOpen,
  isDesktopFiltersExpanded: state.appData.isDesktopFiltersExpanded,
  spaPageName: state.appData.spaPageName,
  viewport: state.viewport,
  mapHasLoaded: state.appData.mapHasLoaded,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setMapAsLoaded,
      setPlayerItem,
      dispatchMessageToModal,
      viewMore,
      toggleMobMenu,
      toggleDesktopFilters,
      setTracksAsLocal,
      setShowsAsLocal,
      setSpaPageName,
      setViewportDimensions,
      resetFilters,
    },
    dispatch
  );

export const goHome = () => {
  if (customHistory.location.pathname !== '/') customHistory.push('/');
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
