
const evaluateKey = (map, key) => {
    return map[key];
};

const getDurationFromSeconds = (secondsTotal = 0) => {
    if (typeof secondsTotal === 'string') return secondsTotal;
    const mins = Math.floor(secondsTotal / 60),
          secs = Math.floor(secondsTotal % 60),
          secondsIndented = secs > 10 ? secs : `0${secs}`;
    return `${mins}:${secondsIndented}`;
};


// const combineByObjKeysArr = (periods, yearsMap) => {
//     const spreadYears = [];
//     for (const period of periods) {
//         spreadYears.concat(yearsMap[period]);
//     }
//      return spreadYears;
// };

const combineByObjKeysArr = (objKeys, obj) => {
    return objKeys.reduce(function(prev, item){
        return prev.concat(obj[item]);
    }, []);
};

const copyToClipboard = (str) => {
    const tmpElm = document.createElement('textarea');
    tmpElm.value = window.location.href;
    tmpElm.setAttribute('readonly', '');
    tmpElm.style.position = 'absolute';
    tmpElm.style.left = '-9999px';
    document.body.appendChild(tmpElm);
    tmpElm.select();
    document.execCommand('copy');
    document.body.removeChild(tmpElm);
};

const getMonthFromShort = (str) => {
    str = str && str.toLowerCase();
    switch (str) {
        case 'jan': return 'January';
        case 'feb': return 'February';
        case 'mar': return 'March';
        case 'apr': return 'April';
        case 'may': return 'May';
        case 'jun': return 'June';
        case 'jul': return 'July';
        case 'aug': return 'August';
        case 'sep': return 'September';
        case 'oct': return 'October';
        case 'nov': return 'November';
        case 'dec': return 'December';
        default: return 'January';
    }
};


export {
    evaluateKey,
    getDurationFromSeconds,
    combineByObjKeysArr,
    copyToClipboard,
    getMonthFromShort
}