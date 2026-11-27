import React, { useState } from 'react';
import SvgSprite from "./svgSprite";


function AnimativeIndicator({ animateFooter, setAnimateFooter, pageName }) {


    return (
        <>
            <section className={`footer__preloader ${animateFooter ? 'footer__preloader--animate-fetch' : ''}`}
                     data-test="splash-root"
                     onAnimationEnd={() => setAnimateFooter(false)}
            >
                <div className='footer__animative-indicator'></div>
            </section>
        </>
    );
}

export default AnimativeIndicator;