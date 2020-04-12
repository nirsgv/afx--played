import React from 'react';
import SvgSprite from "./svgSprite";
import {imgData} from "../data/localImgData";
import PropTypes from 'prop-types';

function Checkbox({ ...restProps }) {

    const { checkboxId, labelText, name, checked, onChangeCb } = restProps;

    return (
        <div className={"checkbox__wrap"}  >
            <label htmlFor={checkboxId}>
                <span>
                    {labelText}
                </span>



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

Checkbox.propTypes = {
    checkboxId: PropTypes.string,
    labelText: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    onChangeCb: PropTypes.func,
};

export default Checkbox;