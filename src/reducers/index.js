import { combineReducers } from 'redux';

import {
    TOGGLE_GRID_LIST_VIEW, EXPAND_FILTER, FILTER_BY_TAG_CB, FILTER_BY_PERIOD_CB, SET_SEARCH_VALUE,
    TOGGLE_SEARCH_OPTION, TOGGLE_SHARE_EXPANSION, DISPATCH_MESSAGE_TO_MODAL, REMOVE_MESSAGE_TO_MODAL, SET_PLAYER_TYPE,
    SET_PLAYER_ITEM, VIEW_MORE, TOGGLE_MOB_MENU, TOGGLE_DESKTOP_FILTERS_EXPANSION, SET_TRACKS_AS_LOCAL,
    SET_SHOWS_AS_LOCAL, SET_SPA_PAGE_NAME, SET_VIEWPORT_DIMENSIONS, RESET_FILTERS, RESET_BATCH, CANCEL_WELCOME_INTRO,
    SET_MAP_AS_LOADED
} from '../actions';


const initialAppState = {
    isGridView: true,
    expandedFilter: 'genres',
    filteredByTags : [],
    filteredByPeriods : [],
    filteredBySearch : '',
    searchArtistNames : true,
    searchTrackTitles : false,
    searchAlbumTitles : false,
    isSharingExpanded: false,
    isMobileMenuOpen: false,
    isDesktopFiltersExpanded: false,
    itemsBatchAmt: 8,
    batchNum: 1,
    isTracksDataLocal: false,
    isShowsDataLocal: false,
    shouldPresentWelcomeIntro: true,
    mapHasLoaded: false,
    spaPageName: '',
};

function appData(state = initialAppState, action) {
    switch(action.type) {

        case SET_MAP_AS_LOADED:
            return {
                ...state,
                mapHasLoaded: action.payload
            };

        case CANCEL_WELCOME_INTRO:
            return {
                ...state,
                shouldPresentWelcomeIntro: false
            };

        case VIEW_MORE:
            return {
                ...state,
                batchNum: action.payload === false ? 1 : state.batchNum + 1
            };

        case RESET_BATCH:
            return {
                ...state,
                batchNum: 1
            };

        case TOGGLE_SHARE_EXPANSION:
            return {
                ...state,
                isSharingExpanded: action.payload === true ? false : !state.isSharingExpanded
            };

        case TOGGLE_GRID_LIST_VIEW:
            return {
                ...state,
                isGridView: !state.isGridView
            };

        case TOGGLE_MOB_MENU:
            console.log(action);
            return {
                ...state,
                isMobileMenuOpen: action.payload !== undefined ? action.payload : !state.isMobileMenuOpen
            };

        case TOGGLE_DESKTOP_FILTERS_EXPANSION:
            console.log(action);
            return {
                ...state,
                isDesktopFiltersExpanded: action.payload !== undefined ? action.payload : !state.isDesktopFiltersExpanded
            };

        case TOGGLE_SEARCH_OPTION:
            //console.log(action.payload);

            switch (action.payload) {
                case 'artist-name':
                    return {
                        ...state,
                        searchArtistNames: !state.searchArtistNames
                    };
                case 'track-title':
                    return {
                        ...state,
                        searchTrackTitles: !state.searchTrackTitles
                    };
                case 'album-title':
                    return {
                        ...state,
                        searchAlbumTitles: !state.searchAlbumTitles
                    }
            }


        case SET_SEARCH_VALUE:
            return {
                ...state,
                filteredBySearch: action.payload
            };

        case EXPAND_FILTER:
            return {
                ...state,
                expandedFilter: action.payload
            };

        case FILTER_BY_TAG_CB:
            const idx = state.filteredByTags.indexOf(action.payload);
            return {
                ...state,
                filteredByTags: idx < 0
                    ? [...state.filteredByTags, action.payload]
                    : [...state.filteredByTags.slice(0, idx), ...state.filteredByTags.slice(idx + 1)]
            };

        case FILTER_BY_PERIOD_CB:
            const index = state.filteredByPeriods.indexOf(action.payload);
            return {
                ...state,
                filteredByPeriods: index < 0
                    ? [...state.filteredByPeriods, action.payload]
                    : [...state.filteredByPeriods.slice(0, index), ...state.filteredByPeriods.slice(index + 1)]
            };

        case RESET_FILTERS:
            return {
                ...state,
                filteredByPeriods: [],
                filteredByTags: [],
                filteredBySearch: '',
                searchArtistNames: true,
                searchTrackTitles: false,
                searchAlbumTitles: false,
            };

        case SET_TRACKS_AS_LOCAL:
            return {
                ...state,
                isTracksDataLocal: action.payload
            };


        case SET_SHOWS_AS_LOCAL:
            console.log(action);
            return {
                ...state,
                isShowsDataLocal: action.payload
            };

        case SET_SPA_PAGE_NAME:
            console.log(action);
            return {
                ...state,
                spaPageName: action.payload
            };
        default:
            return state;
    }
}


function messages(state = { currentMessages: [] }, action) {
    switch(action.type) {

        case REMOVE_MESSAGE_TO_MODAL:
            return {
                ...state,
                currentMessages: state.currentMessages.filter((item) => item.uniqueId !== action.payload)
            };

        case DISPATCH_MESSAGE_TO_MODAL:
            return {
                ...state,
                currentMessages: state.currentMessages.concat({
                    id: action.payload,
                    uniqueId: Date.now()
                })
            };

        default:
            return state;
    }
}


function player(state = { platform: '', item: '', trackId: '' }, action) {
    switch(action.type) {

        case SET_PLAYER_TYPE:
            return {
                ...state,
                platform: action.payload.item
            };

        case SET_PLAYER_ITEM:
            return {
                ...state,
                item: action.payload.item,
                platform: action.payload.platform,
                trackId: action.payload.trackId,
            };

        default:
            return state;
    }
}

const viewportState = {
    dimensions: {
        innerWidth: 0,
        innerHeight: 0,
        outerWidth: 0,
        outerHeight: 0
    }
};

function viewport(state = viewportState, action) {
    switch(action.type) {

        case SET_VIEWPORT_DIMENSIONS:
            return {
                ...state,
                dimensions: action.payload
            };

        default:
            return state;
    }
}



const rootReducer = combineReducers({
    appData,
    messages,
    player,
    viewport
});


export default rootReducer;