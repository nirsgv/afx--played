import React from 'react';
import { Helmet } from "react-helmet";
import SvgSprite from "../components/svgSprite";
import { imgData } from "../data/localImgData";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";


export const atLeastOneIsFalse = (a, b) => {
    return !a || !b
};

function Splash({ isTracksDataLocal, isShowsDataLocal }) {

    return (
        atLeastOneIsFalse(isTracksDataLocal, isShowsDataLocal) && (
        <>
            <Helmet>
                <title>Loading...</title>
                <meta name="description" content="This is the loading preloader" />
            </Helmet>

            <section className="splash" data-test="splash-root">
                {/*<h1 className={"animate-opacity"}>Splashing...</h1>*/}
                <SvgSprite classes={'splash-icon animate-opacity '} name={'APHEX'} />
            </section>
        </>
        )
    );
}

const mapStateToProps = state => ({
    isTracksDataLocal: state.appData.isTracksDataLocal,
    isShowsDataLocal: state.appData.isShowsDataLocal,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Splash);
