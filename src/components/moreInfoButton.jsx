import React from 'react';
import SvgSprite from "./svgSprite";
import { Link } from "react-router-dom";

function MoreInfoButton({ ...restProps }) {
    const { className = 'more-info', ID='' } = restProps;

    return (
        <div className={`${className}__button`}>

            {ID
                ? <Link to={`track/${encodeURIComponent(ID)}`} className={`${className}__link`}>
                    <span className={`${className}__text`}>More Info</span>
                    <SvgSprite classes={`${className}__icon`} name={'LONG_ARROW_RIGHT'}/>
                </Link>
                :
                <div className={`${className}__link`}>
                    <span className={`${className}__text`}>More Info</span>
                    <SvgSprite classes={`${className}__icon`} name={'LONG_ARROW_RIGHT'} />
                </div>
            }
        </div>
    );
}

MoreInfoButton.propTypes = {

};

export default MoreInfoButton;