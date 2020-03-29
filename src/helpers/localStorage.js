
const _isThereLocalData = (key) => {
    let item = localStorage.getItem(key);
    return item !== null && typeof item === "string" && item.length !== 0;
};


const _isDataRecent = (key) => {
    const now = Date.now();
    const ONE_WEEK = 604800000;
    const dateOfObjInLocal = JSON.parse(localStorage.getItem(key)).date;
    return dateOfObjInLocal > now - ONE_WEEK;
};


const updatedLS = (url, key, cb) => {
    if ( !_isThereLocalData(key) || !_isDataRecent(key) ) {
        // fetch and set as local data
        fetch(url)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem(key, JSON.stringify({
                    date: Date.now(),
                    data
                }));
                //console.log(localStorage.getItem(key));
                cb(true);
            })
            .catch(error => console.error(error));
    } else {
        cb(true);
    }
};

export { updatedLS };