import React, { useState, useRef, useEffect } from 'react';
import Icon from './icon';

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
            {isLeftScrollNeeded(translatedX) && <button className="quick-slide__button quick-slide__button--left" onClick={()=>clickedLeft(translatedX)}>left</button>}
            <div className="quick-slide__content" style={{transform:`translateX(${translatedX}px)`}} >
                <ul className="quick-slide__list" ref={ref}>
                    {children}
                </ul>
            </div>
            {isRightScrollNeeded(translatedX) && <button className="quick-slide__button quick-slide__button--right" onClick={()=>clickedRight(translatedX)}>right</button>}
        </div>
    )
};

export default QuickSlide;