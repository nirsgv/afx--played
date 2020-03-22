import React, { useState } from 'react';
import Icon from './icon';
import classNames from 'classnames';
import LazyLoad from 'react-lazy-load';

const QuickSlide = ({children}) => {

    const [translatedX, setTranslatedX] = useState(0);


    return (
        <div className="quick-slide__wrap" style={{transform:`translateX(${translatedX}px)`}}>
            <ul className="quick-slide__list">
                {children}
            </ul>
        </div>
    )
};

export default QuickSlide;