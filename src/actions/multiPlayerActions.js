import {
    SET_PLAYER_TYPE,
    SET_PLAYER_ITEM,
    TOGGLE_EMBEDDED_PLAY
} from "./index";

function setPlayerType(type) {
    const action = {
        type: SET_PLAYER_TYPE,
        payload: type
    };

    return action;
}

const trimByPlatform = (val, platform) => {
    let res = '';
    switch(platform) {
        case 'youtube':
            res = val.split('/');
            res = res[res.length - 1];
            break;
        case 'spotify':
            res = val.split('/');
            res = res[res.length - 1];
            break;
        case 'deezer':
            // code block
            break;
        case 'apple':
            // code block
            break;
        default:
        // code block
    }
    return res;
};

function setPlayerItem(e, val, platform) {
    e.preventDefault();
    console.log(val);
    setPlayerType(platform);
    //store.dispatch(setPlayerType(platform));
    const item = trimByPlatform(val, platform);

    const action = {
        type: SET_PLAYER_ITEM,
        payload: { item, platform }
    };

    return action;
}

function toggleEmbeddedPlay(val) {
    console.log(2);
    const action = {
        type: TOGGLE_EMBEDDED_PLAY,
        payload: val
    };

    return action;
}

export {
    setPlayerType,
    setPlayerItem,
    toggleEmbeddedPlay
}