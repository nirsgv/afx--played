import React from 'react';


function InputBox({ cb, classname, name, placeholder, children }) {
    return (
        <div className={`${classname}__wrap`}>

            {children}
            <input type="text" name={name} placeholder={placeholder} className={`${classname}__input`} onInput={(e) => cb(e)}/>
        </div>

    );
}

export default InputBox;