const debounce = ( cb, delay ) => {
    let inDebounce;
    return function(){
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => cb.apply(context, args), delay);
    }
};

const throttle = ( cb, delay ) => {
    let inThrottle;
    return function(){
        const context = this;
        const args = arguments;
        if (!inThrottle) {
            cb.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, delay)
        }
    }
};

const memofy = (fn) => {
    const memory = {};
    let result;
    return function () {
        const context = this;
        const args = arguments;
        const argsText = JSON.stringify(Array.from(args));
        if (memory[argsText]){
            return memory[argsText]
        } else {
            result = fn.apply(context, args);
            return memory[argsText] = result;
        }
    }
};

export {
    debounce,
    throttle,
    memofy,
}
// const consoleSomething = (text) => {console.log(text)};
// document.querySelector('.box1').addEventListener('click', debounce(function(){consoleSomething('debounce')}, 1000));
// document.querySelector('.box2').addEventListener('click', throttle(function(){consoleSomething('throttle')}, 1000));
// const add = (a, b) => a + b;
// const multiply = (a, b, c, d, e) => a * b * c * d * e;
// const memoizedFunc = memofy(multiply);
