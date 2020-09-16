import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function InputBox({
  cb,
  classname,
  name,
  placeholder,
  children,
  value,
  focusToggleCb,
}) {
  const textInputRef = useRef(null);

  return (
    <div className={`${classname}__wrap`}>
      {children}
      <input
        type='text'
        name={name}
        ref={textInputRef}
        placeholder={placeholder}
        className={`${classname}__input`}
        onChange={(e) => (cb ? cb(e) : null)}
        onFocus={() => (focusToggleCb ? focusToggleCb(true) : null)}
        onBlur={() => (focusToggleCb ? focusToggleCb(false) : null)}
        value={value}
      />
    </div>
  );
}

InputBox.defaultProps = {
  classname: 'track',
  value: '',
};

InputBox.propTypes = {
  cb: PropTypes.func,
  classname: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  children: PropTypes.node,
  value: PropTypes.string,
};

export default InputBox;
