

const isBottomOfPage = (context) => {
    return ((context.innerHeight + context.document.documentElement.scrollTop) >= context.document.body.offsetHeight)
};

const isBiggerFromMobile = (dimensions) => {
    return dimensions.innerWidth >= 640
};

const scrollTop = () => {
    return window.scrollTo(0, 0);
};

export {
    isBottomOfPage,
    isBiggerFromMobile,
    scrollTop
}

