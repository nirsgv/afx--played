import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { imgData } from '../data/localImgData';

function SvgSprite({ ...restProps }) {
  const {
    name,
    className,
    classes,
    src = imgData.sprite.src,
    clickCb,
    viewBox = '0 0 24 24',
    style = {},
  } = restProps;

  const clickHandler = (event) => {
    clickCb && clickCb(event);
  };

  return (
    <span
      className={className || classNames(classes)}
      onClick={(e) => clickHandler(e)}
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
  classes: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

SvgSprite.defaultProps = {
  throttleTimeoutForMouseOver: 300,
};

export default SvgSprite;
