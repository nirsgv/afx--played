import {DISPATCH_MESSAGE_TO_MODAL, REMOVE_MESSAGE_TO_MODAL} from "./index";

function removeMessageToModal(id) {
    //console.log('removing id:', id, 'at:', Date.now());
    const action = {
        type: REMOVE_MESSAGE_TO_MODAL,
        payload: id
    };
    return action;
}

function dispatchMessageToModal(val) {
    const action = {
        type: DISPATCH_MESSAGE_TO_MODAL,
        payload: val
    };
    return action;
}

export {
    removeMessageToModal,
    dispatchMessageToModal
}