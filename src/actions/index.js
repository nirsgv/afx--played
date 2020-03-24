
import {
    removeMessageToModal,
    dispatchMessageToModal
} from './messagesModalActions';

import {
    setPlayerItem,
    toggleEmbeddedPlay
} from './multiPlayerActions';

import {
    toggleSearchOption,
    setSearchValue,
    filterByPeriodCb,
    filterByTagCb,
    resetFilters
} from './itemFilteringActions';

export {
    toggleShareExpansion,
    toggleGridListView,
    expandFilter,
    viewMore,
    toggleMobMenu,
    toggleDesktopFilters,
    setTracksAsLocal,
    setShowsAsLocal,
    setSpaPageName
} from './uiToggle';

export {
    setViewportDimensions
} from './viewportActions';

export const TOGGLE_GRID_LIST_VIEW = 'TOGGLE_GRID_LIST_VIEW';
export const EXPAND_FILTER = 'EXPAND_FILTER';
export const FILTER_BY_TAG_CB = 'FILTER_BY_TAG_CB';
export const FILTER_BY_PERIOD_CB = 'FILTER_BY_PERIOD_CB';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const TOGGLE_SEARCH_OPTION = 'TOGGLE_SEARCH_OPTION';
export const TOGGLE_SHARE_EXPANSION = 'TOGGLE_SHARE_EXPANSION';
export const DISPATCH_MESSAGE_TO_MODAL = 'DISPATCH_MESSAGE_TO_MODAL';
export const REMOVE_MESSAGE_TO_MODAL = 'REMOVE_MESSAGE_TO_MODAL';
export const SET_PLAYER_TYPE = 'SET_PLAYER_TYPE';
export const SET_PLAYER_ITEM = 'SET_PLAYER_ITEM';
export const TOGGLE_EMBEDDED_PLAY = 'TOGGLE_EMBEDDED_PLAY';
export const VIEW_MORE = 'VIEW_MORE';
export const TOGGLE_MOB_MENU = 'TOGGLE_MOB_MENU';
export const TOGGLE_DESKTOP_FILTERS_EXPANSION = 'TOGGLE_DESKTOP_FILTERS_EXPANSION';
export const SET_TRACKS_AS_LOCAL = 'SET_TRACKS_AS_LOCAL';
export const SET_SHOWS_AS_LOCAL = 'SET_SHOWS_AS_LOCAL';
export const SET_SPA_PAGE_NAME = 'SET_SPA_PAGE_NAME';
export const SET_VIEWPORT_DIMENSIONS = 'SET_VIEWPORT_DIMENSIONS';
export const RESET_FILTERS = 'RESET_FILTERS';

export  {
    filterByTagCb,
    filterByPeriodCb,
    setSearchValue,
    toggleSearchOption,
    dispatchMessageToModal,
    removeMessageToModal,
    setPlayerItem,
    toggleEmbeddedPlay,
    resetFilters
}