import React from 'react';
import {Helmet} from "react-helmet";
import SvgSprite from "./svgSprite";
import {imgData} from "../data/localImgData";
import {Router} from "react-router-dom";



export const atLeastOneIsFalse = (isTracksDataLocal, isShowsDataLocal) => {
    return !isTracksDataLocal || !isShowsDataLocal
};

function Splash({ isTracksDataLocal, isShowsDataLocal }) {

    return (
        atLeastOneIsFalse(isTracksDataLocal, isShowsDataLocal) && (
        <>
            <Helmet>
                <title>Splash page...</title>
                <meta name="description" content="This is the main page" />
            </Helmet>

            <section className="splash" data-test="splash-root">
                <h1 className={"animate-opacity"}>Splashing...</h1>
                <SvgSprite classes={'splash-icon animate-opacity '} src={imgData.sprite.src} alt={imgData.sprite.description} name={'APHEX'} />
            </section>
        </>
        )
    );
}

export default Splash;