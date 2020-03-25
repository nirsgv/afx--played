import React from 'react';


function InputBox({ cb, classname, name, placeholder, children, value }) {
    return (
        <div className={`${classname}__wrap`}>

            {children}
            <input type="text" name={name} placeholder={placeholder} className={`${classname}__input`} onChange={(e) => cb(e)} value={value}/>
        </div>

    );
}

export default InputBox;