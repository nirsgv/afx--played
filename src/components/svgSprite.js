import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function SvgSprite ({...restProps}) {
    const {name, classes, path, src, clickCb, modifier, text, onMouseLeave, onMouseOver, viewBox = '0 0 24 24'} = restProps;
    const clickHandler = (event) => {
        event.stopPropagation();
        clickCb && clickCb(event);
    };

    return (
        <span className={classNames('something', classes)}
            onClick={() => clickHandler}
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