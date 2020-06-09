import {
    SET_PLAYER_TYPE,
    SET_PLAYER_ITEM,
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

function setPlayerItem(e, val, platform, trackId) {
    e.preventDefault();
    setPlayerType(platform);
    //store.dispatch(setPlayerType(platform));
    const item = trimByPlatform(val, platform);

    const action = {
        type: SET_PLAYER_ITEM,
        payload: { item, platform, trackId }
    };

    return action;
}

function closePlayer(e) {
    e.preventDefault();
    const clear = {
        item: '',
        platform: 'YOUTUBE'.toLowerCase(),
        trackId: '',
    };

    const action = {
        type: SET_PLAYER_ITEM,
        payload: clear
    };

    return action;
}

export {
    setPlayerType,
    setPlayerItem,
    closePlayer
}