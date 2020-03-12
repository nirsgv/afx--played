

const isBottomOfPage = (context) => {
    return ((context.innerHeight + context.document.documentElement.scrollTop) >= context.document.body.offsetHeight)
};

export {
    isBottomOfPage,
}