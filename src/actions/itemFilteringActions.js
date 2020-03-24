import {
    FILTER_BY_PERIOD_CB, FILTER_BY_TAG_CB,
    SET_SEARCH_VALUE,
    TOGGLE_SEARCH_OPTION
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
    goHome();
    const action = {
        type: SET_SEARCH_VALUE,
        payload: e.target.value
    };

    return action;
}

function filterByPeriodCb(periodKey) {
    console.log(periodKey);
    goHome();
    const action = {
        type: FILTER_BY_PERIOD_CB,
        payload: periodKey
    };

    return action;
}

function filterByTagCb(tagKey) {
    console.log(tagKey);
    goHome();
    const action = {
        type: FILTER_BY_TAG_CB,
        payload: tagKey
    };

    return action;
}

function clearAll(tagKey) {
    const action = {
        type: FILTER_BY_TAG_CB,
        payload: tagKey
    };

    return action;
}

export {
    toggleSearchOption,
    setSearchValue,
    filterByPeriodCb,
    filterByTagCb
}