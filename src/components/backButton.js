import React from 'react';
import SvgSprite from "./svgSprite";

function BackButton({ ...restProps }) {
    const { className = 'back-button', history } = restProps;

    return (
        <button className={`${className}__button`}
                onClick={history.length > 0 ? history.goBack : null}>
            <SvgSprite classes={`${className}__icon`} name={'ANGLE_LEFT'} />
            <span className={`${className}__text`}>Back</span>
        </button>
    );
}

BackButton.propTypes = {

};

export default BackButton;