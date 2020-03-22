import React, { useState, useRef, useEffect } from 'react';
import Icon from './icon';
import SvgSprite from "./svgSprite";
import {imgData} from "../data/localImgData";
import InputBox from "./inputBox";

function QuickSlide ({children})  {
    const [translatedX, setTranslatedX] = useState(0),
          [slidesWidth, setSlidesWidth] = useState(0),
          [wrapperWidth, SetWrapperWidth] = useState(0),
          ref = useRef(null),
          ref2= useRef(null);
    useEffect(() => {
        const width = ref.current ? ref.current.offsetWidth : 0;
        const wrapperW = ref2.current ? ref2.current.offsetWidth : 0;
        setSlidesWidth(width);
        SetWrapperWidth(wrapperW);
    }, [ref.current, ref2.current]);



    const isLeftScrollNeeded = (translatedX) => {
        return translatedX < 0;
    };

    const isRightScrollNeeded = (translatedX) => {
        return wrapperWidth - translatedX < slidesWidth;
    };

    const clickedLeft = (translatedX) => {
        isLeftScrollNeeded(translatedX) &&  setTranslatedX(translatedX + 200);
    };

    const clickedRight = (translatedX) => {
        isRightScrollNeeded(translatedX) &&  setTranslatedX(translatedX - 200);
    };

    return (
        <div className="quick-slide__wrap" ref={ref2}>

            <button
                className={`quick-slide__button quick-slide__button--left quick-slide__button--${isLeftScrollNeeded(translatedX) ? 'active' : 'disabled'}`}
                onClick={() => clickedLeft(translatedX)}>
                <SvgSprite classes={'quick-slide__icon quick-slide__icon--left'} src={imgData.sprite.src}
                           alt={imgData.sprite.description} name={'ANGLE_LEFT'}/>
            </button>

            <div className="quick-slide__content" style={{transform: `translateX(${translatedX}px)`}}>
                <ul className="quick-slide__list" ref={ref}>
                    {children}
                </ul>
            </div>

            <button
                className={`quick-slide__button quick-slide__button--right quick-slide__button--${isRightScrollNeeded(translatedX) ? 'active' : 'disabled'}`}
                onClick={() => clickedRight(translatedX)}>
                <SvgSprite classes={'quick-slide__icon quick-slide__icon--right'} src={imgData.sprite.src}
                           alt={imgData.sprite.description} name={'ANGLE_RIGHT'}/>
            </button>
        </div>
    )
};

export default QuickSlide;