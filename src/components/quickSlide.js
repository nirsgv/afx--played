import React, { useState, useRef, useEffect } from 'react';
import SvgSprite from "./svgSprite";
import {imgData} from "../data/localImgData";
import { throttle, debounce } from "../helpers/higherFunctions";
import PropTypes from 'prop-types';

function QuickSlide ({children, title})  {
    const [translatedX, setTranslatedX] = useState(0),
          [slidesWidth, setSlidesWidth] = useState(0),
          [wrapperWidth, SetWrapperWidth] = useState(0),
          listRef = useRef(null),
          wrapperRef= useRef(null);

    const singleMoveAmt = 320;
    const swipingThreshold = 50;

    useEffect(() => {
        debouncedUpdateDimensions();
        window.addEventListener('resize', debouncedUpdateDimensions);
        return () => {
            window.removeEventListener('resize', debouncedUpdateDimensions);
        }
    }, [listRef.current, wrapperRef.current]);

    const coor = {
        xDown: null,
        yDown: null,
        xUp: null,
        yUp: null,
        xDiff: null,
        yDiff: null
    };

    const handleTouchStart = (e) => {
        coor.xDown = e.touches[0].clientX;
        coor.yDown = e.touches[0].clientY;
    };
    const handleTouchMove = (e, translatedX) => {
        if (!coor.xDown || !coor.yDown) {
            return;
        }

        coor.xUp = e.touches[0].clientX;
        coor.yUp = e.touches[0].clientY;
        coor.xDiff = coor.xDown - coor.xUp;
        coor.yDiff = coor.yDown - coor.yUp;

        if (Math.abs(coor.xDiff) + Math.abs(coor.yDiff) > swipingThreshold) {
            if (Math.abs(coor.xDiff) > Math.abs(coor.yDiff)) {
                if (coor.xDiff > 0) {
                    clickedRight(translatedX);
                } else {
                    clickedLeft(translatedX);
                }
            }
            /* reset values */
            coor.xDown = null;
            coor.yDown = null;
        }
    };



    const updateDimensions = () => {
        setSlidesWidth(listRef.current ? listRef.current.offsetWidth : 0);
        SetWrapperWidth(wrapperRef.current ? wrapperRef.current.offsetWidth : 0);
    };

    const debouncedUpdateDimensions = debounce(updateDimensions, 100);


    const isLeftScrollNeeded = (translatedX) => {
        return translatedX < 0;
    };

    const isRightScrollNeeded = (translatedX) => {
        return wrapperWidth - translatedX < slidesWidth;
    };

    const clickedLeft = (translatedX) => {
        isLeftScrollNeeded(translatedX) &&  setTranslatedX(translatedX + singleMoveAmt);
    };

    const clickedRight = (translatedX) => {
        isRightScrollNeeded(translatedX) &&  setTranslatedX(translatedX - singleMoveAmt);
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
                <ul className="quick-slide__list" ref={listRef}
                    onTouchStart={(e) => {
                        handleTouchStart(e, translatedX);
                    }}
                    onTouchMove={(e) => {
                        handleTouchMove(e, translatedX);
                    }}>
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

QuickSlide.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
};

export default QuickSlide;