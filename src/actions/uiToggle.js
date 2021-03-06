import {
    EXPAND_FILTER, TOGGLE_GRID_LIST_VIEW, TOGGLE_SHARE_EXPANSION, VIEW_MORE,
    TOGGLE_MOB_MENU, TOGGLE_DESKTOP_FILTERS_EXPANSION, SET_TRACKS_AS_LOCAL, SET_SHOWS_AS_LOCAL, SET_SPA_PAGE_NAME,
    SET_SAMPLE_ID, CANCEL_WELCOME_INTRO, SET_MAP_AS_LOADED
} from "./index";

/**
 *
 * @param {Boolean} shouldOnlyClose
 * @returns {{type: string, payload: *}}
 */
function toggleShareExpansion(shouldOnlyClose = true) {
    const action = {
        type: TOGGLE_SHARE_EXPANSION,
        payload: shouldOnlyClose
    };
    return action;
}

function setMapAsLoaded(bool) {
    const action = {
        type: SET_MAP_AS_LOADED,
        payload: bool
    };

    return action;
}

function cancelWelcomeIntro() {
    const action = {
        type: CANCEL_WELCOME_INTRO,
        payload: false
    };

    return action;
}

function toggleGridListView(val) {
    const action = {
        type: TOGGLE_GRID_LIST_VIEW,
        val
    };

    return action;
}

function expandFilter(val) {
    const action = {
        type: EXPAND_FILTER,
        payload: val
    };

    return action;
}

function viewMore(val) {
    const action = {
        type: VIEW_MORE,
        payload: val
    };

    return action;
}

function toggleMobMenu(payload) {
    const action = {
        type: TOGGLE_MOB_MENU,
        payload
    };

    return action;
}

function toggleDesktopFilters(payload) {
    const action = {
        type: TOGGLE_DESKTOP_FILTERS_EXPANSION,
        payload
    };

    return action;
}

function setTracksAsLocal(payload) {
    const action = {
        type: SET_TRACKS_AS_LOCAL,
        payload
    };

    return action;
}

function setShowsAsLocal(payload) {
    const action = {
        type: SET_SHOWS_AS_LOCAL,
        payload
    };

    return action;
}

function setSpaPageName(payload) {
    const action = {
        type: SET_SPA_PAGE_NAME,
        payload
    };

    return action;
}


export {
    toggleShareExpansion,
    toggleGridListView,
    expandFilter,
    viewMore,
    toggleMobMenu,
    toggleDesktopFilters,
    setTracksAsLocal,
    setShowsAsLocal,
    setSpaPageName,
    setMapAsLoaded,
    cancelWelcomeIntro
}