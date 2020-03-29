import React, { useState, useRef, useEffect } from 'react';
import SvgSprite from "./svgSprite";
import {imgData} from "../data/localImgData";
import { throttle, debounce } from "../helpers/higherFunctions";

function QuickSlide ({children, title})  {
    const [translatedX, setTranslatedX] = useState(0),
          [slidesWidth, setSlidesWidth] = useState(0),
          [wrapperWidth, SetWrapperWidth] = useState(0),
          listRef = useRef(null),
          wrapperRef= useRef(null);
    useEffect(() => {
        debouncedUpdateDimensions();
        window.addEventListener('resize', debouncedUpdateDimensions);
        return () => {
            window.removeEventListener('resize', debouncedUpdateDimensions);
        }
    }, [listRef.current, wrapperRef.current]);

    const updateDimensions = () => {
        const width = listRef.current ? listRef.current.offsetWidth : 0;
        const wrapperW = wrapperRef.current ? wrapperRef.current.offsetWidth : 0;
        //console.log({width, wrapperW});
        setSlidesWidth(width);
        SetWrapperWidth(wrapperW);
    };

    const debouncedUpdateDimensions = debounce(updateDimensions, 100);


    const isLeftScrollNeeded = (translatedX) => {
        return translatedX < 0;
    };

    const isRightScrollNeeded = (translatedX) => {
        return wrapperWidth - translatedX < slidesWidth;
    };

    const clickedLeft = (translatedX) => {
        isLeftScrollNeeded(translatedX) &&  setTranslatedX(translatedX + 400);
    };

    const clickedRight = (translatedX) => {
        isRightScrollNeeded(translatedX) &&  setTranslatedX(translatedX - 400);
    };

    return (
        <>
        <div className="quick-slide__title">
            <h2 className="quick-slide__title__text">{title}</h2>
        </div>
        <div className="quick-slide__wrap" ref={wrapperRef}>

            <button
                className={`quick-slide__button quick-slide__button--left quick-slide__button--${isLeftScrollNeeded(translatedX) ? 'active' : 'disabled'}`}
                onClick={() => clickedLeft(translatedX)}>
                <SvgSprite classes={'quick-slide__icon quick-slide__icon--left'} src={imgData.sprite.src}
                           alt={imgData.sprite.description} name={'ANGLE_LEFT'}/>
            </button>

            <div className="quick-slide__content" style={{transform: `translateX(${translatedX}px)`}}>
                <ul className="quick-slide__list" ref={listRef}>
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
        </>
    )
};

export default QuickSlide;