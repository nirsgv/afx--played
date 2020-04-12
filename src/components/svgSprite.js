import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function SvgSprite ({...rest}) {
    const {name, classes, path, src, clickCb, modifier, text, onMouseLeave, onMouseOver, viewBox = '0 0 24 24'} = rest;
    const clickHandler = (event) => {
        event.stopPropagation();
        clickCb && clickCb(event);
    }

    return (
        <span className={classNames('something', classes)}
            onClick={clickHandler}
            >
           <svg viewBox={viewBox}>
                <use xlinkHref={`${src}#${name}`} />
            </svg>
        </span>
    );
}

SvgSprite.propTypes = {
    modifier: PropTypes.string,
    text: PropTypes.string,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
    classes: PropTypes.array,
};

SvgSprite.defaultProps = {
    throttleTimeoutForMouseOver: 300
};

export default SvgSprite;