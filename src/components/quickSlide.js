import React, { useState, useRef, useEffect } from 'react';
import Icon from './icon';

function QuickSlide ({children})  {
    const [translatedX, setTranslatedX] = useState(0);
    const [slidesWidth, setSlidesWidth] = useState(0);
    const [wrapperWidth, SetWrapperWidth] = useState(0);
    const ref = useRef(null);
    const ref2= useRef(null);
    useEffect(() => {
        const width = ref.current ? ref.current.offsetWidth : 0;
        const wrapperW = ref2.current ? ref2.current.offsetWidth : 0;
        setSlidesWidth(width);
        SetWrapperWidth(wrapperW);
    }, [ref.current, ref2.current]);

    const clickedLeft = (translatedX) => {
        if (translatedX < 0 )setTranslatedX(translatedX + 200);
    };

    const clickedRight = (translatedX) => {
        console.log({ translatedX, slidesWidth });
        if (wrapperWidth - translatedX < slidesWidth ) setTranslatedX(translatedX - 200);
    };

    return (
        <div className="quick-slide__wrap" ref={ref2}>
            <button className="quick-slide__button quick-slide__button--left" onClick={()=>clickedLeft(translatedX)}>left</button>
            <div className="quick-slide__content" style={{transform:`translateX(${translatedX}px)`}} >
                <ul className="quick-slide__list" ref={ref}>
                    {children}
                </ul>
            </div>
            <button className="quick-slide__button quick-slide__button--right" onClick={()=>clickedRight(translatedX)}>right</button>
        </div>
    )
};

export default QuickSlide;