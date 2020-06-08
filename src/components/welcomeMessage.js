import React from 'react';
import { Link } from 'react-router-dom';
import SvgSprite from "./svgSprite";

function BackButton({ ...restProps }) {
    const { className = 'welcome-message', history, cancelWelcomeIntro } = restProps;



    return (
        <aside className={className} onClick={cancelWelcomeIntro}>
            <div className={`${className}__content`}>
                {/*<h1 className={`${className}__headline`}>Hello!</h1>*/}
                <p className={`${className}__paragraph`}>
                    This site presents <strong>a list</strong> of tracks.<br />
                    These tracks were played by Richard James aka The Aphex Twin during his shows.
                </p>
                <Link className={`${className}__link`} to="/about">More info</Link>

            </div>
            <div className={`${className}__close-wrap`}>
                <button onClick={cancelWelcomeIntro} className={`${className}__close-button`}>
                    <SvgSprite name={'TIMES'} />
                </button>
            </div>

        </aside>
    );
}

BackButton.propTypes = {

};

export default BackButton;