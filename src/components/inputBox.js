import React from 'react';
import PropTypes from 'prop-types';


function InputBox({ cb, classname, name, placeholder, children, value }) {
    return (
        <div className={`${classname}__wrap`}>

            {children}
            <input type="text" name={name} placeholder={placeholder} className={`${classname}__input`} onChange={(e) => cb(e)} value={value}/>
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