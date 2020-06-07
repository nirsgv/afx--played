import React from 'react';
import { Link } from 'react-router-dom';

function BackButton({ ...restProps }) {
    const { className = 'welcome-message', history, cancelWelcomeIntro } = restProps;

    const waitLittle = () => {
      setTimeout(cancelWelcomeIntro, 1000);
    };


    return (
        <aside className={className} onClick={waitLittle}>
            <h1 className={`${className}__headline`}>Hello!</h1>
            <p className={`${className}__paragraph`}>
                This site presents <strong>a list</strong> of tracks.<br />
                These tracks were played by Richard James aka The Aphex Twin during his shows.
            </p>
            <Link className={`${className}__link`} to="/about">More info</Link>

        </aside>
    );
}

BackButton.propTypes = {

};

export default BackButton;