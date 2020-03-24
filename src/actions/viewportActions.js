import {
    SET_VIEWPORT_DIMENSIONS,
} from "./index";

function setViewportDimensions(obj) {
    const action = {
        type: SET_VIEWPORT_DIMENSIONS,
        payload: obj
    };

    return action;
}

export {
    setViewportDimensions,
}