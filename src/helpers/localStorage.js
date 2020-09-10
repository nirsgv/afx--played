const _isThereLocalData = (key) => {
  let item = localStorage.getItem(key);
  return item !== null && typeof item === 'string' && item.length !== 0;
};

const _isDataRecent = (key) => {
  const now = Date.now(),
    ONE_DAY = 86400000,
    dateOfObjInLocal = JSON.parse(localStorage.getItem(key)).date;
  return dateOfObjInLocal > now - ONE_DAY;
};

// if intro was not recently shown, set date on corresponding local-storage key otherwise cancel presentation
const checkIntroNecessity = (key, cb) => {
  if (!_isThereLocalData(key) || !_isDataRecent(key)) {
    localStorage.setItem(key, JSON.stringify({ date: Date.now() }));
  } else {
    cb();
  }
};

export { checkIntroNecessity };
