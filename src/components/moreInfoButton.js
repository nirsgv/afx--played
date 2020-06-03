import React from 'react';
import SvgSprite from "./svgSprite";
import { Link } from "react-router-dom";

function MoreInfoButton({ ...restProps }) {
    const { className = 'more-info-button', history, ID } = restProps;

    return (
        <button className={`${className}__button`}>

            <Link to={`track/${encodeURIComponent(ID)}`} className={`${className}__cta`}>
                <h4>
                    <span className={`${className}__text`}>More Info</span>
                    <SvgSprite name={'LONG_ARROW_RIGHT'} />
                </h4>
            </Link>
        </button>
    );
}

MoreInfoButton.propTypes = {

};

export default MoreInfoButton;