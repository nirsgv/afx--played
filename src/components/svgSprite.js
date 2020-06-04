import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { imgData } from "../data/localImgData";

function SvgSprite ({...restProps}) {
    const {name, classes, path, src = imgData.sprite.src, clickCb, alt=imgData.sprite.description,
        modifier, text, onMouseLeave, onMouseOver, viewBox = '0 0 24 24',
        style={}
    } = restProps;

    const clickHandler = (event) => {
        event.stopPropagation();
        clickCb && clickCb(event);
    };

    return (
        <span className={classNames(classes)} // classes can be comma-sepatrate-added
            onClick={() => clickHandler}
              style={style}
            >
           <svg viewBox={viewBox}>
                <use xlinkHref={`${src}#${name}`} />
            </svg>
        </span>
    );
}

SvgSprite.propTypes = {
    viewBox: PropTypes.string,
    modifier: PropTypes.string,
    text: PropTypes.string,
    clickCb: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
    classes: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string
    ]),
};

SvgSprite.defaultProps = {
    throttleTimeoutForMouseOver: 300
};

export default SvgSprite;