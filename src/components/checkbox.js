import React from 'react';
import SvgSprite from "./svgSprite";
import {imgData} from "../data/localImgData";

function Checkbox({ checkboxId, labelText, name, checked, onChangeCb }) {

    return (
        <div className={"checkbox__wrap"}  >
            <label htmlFor={checkboxId}>
                {labelText}


                <input type="checkbox"
                       id={checkboxId}
                       name={name}
                       checked={checked}
                       onChange={onChangeCb}
                />
                <SvgSprite classes={'icon-logo'} src={imgData.sprite.src} alt={imgData.sprite.description} name={'CHECK'} />
            </label>

        </div>

    );
}

export default Checkbox;