import {
    FILTER_BY_PERIOD_CB, FILTER_BY_TAG_CB, RESET_FILTERS,
    SET_SEARCH_VALUE,
    TOGGLE_SEARCH_OPTION, RESET_BATCH
} from "./index";

import { goHome } from '../App'

function toggleSearchOption(e) {
    goHome();
    const action = {
        type: TOGGLE_SEARCH_OPTION,
        payload: e.target.name
    };
    return action;
}

function setSearchValue(e) {
    goHome(); //todo: move
    const action = {
        type: SET_SEARCH_VALUE,
        payload: e.target.value
    };

    return action;
}

function filterByPeriodCb(periodKey) {
    console.log(periodKey);
    goHome(); //todo: move
    const action = {
        type: FILTER_BY_PERIOD_CB,
        payload: periodKey
    };

    return action;
}

function filterByTagCb(tagKey) {
    console.log(tagKey);
    goHome(); //todo: move
    const action = {
        type: FILTER_BY_TAG_CB,
        payload: tagKey
    };

    return action;
}

function resetFilters(tagKey) {
    console.log(tagKey);
    const action = {
        type: RESET_FILTERS,
        payload: tagKey
    };

    return action;
}

function resetBatch() {
    const action = {
        type: RESET_BATCH,
        payload: 1
    };

    return action;
}

export {
    toggleSearchOption,
    setSearchValue,
    filterByPeriodCb,
    filterByTagCb,
    resetFilters,
    resetBatch
}