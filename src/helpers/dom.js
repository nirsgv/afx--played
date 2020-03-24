

const isBottomOfPage = (context) => {
    return ((context.innerHeight + context.document.documentElement.scrollTop) >= context.document.body.offsetHeight)
};

const isBiggerFromMobile = (dimensions) => {
    return dimensions.innerWidth >= 640
};

export {
    isBottomOfPage,
    isBiggerFromMobile
}

