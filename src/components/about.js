import React, { useEffect } from 'react';
import { Helmet } from "react-helmet";
import BackButton from "./backButton";
import ShowGoogleMap from "./showsGoogleMap";
import { scrollTop } from '../helpers/dom';

function About({ history, name, setSpaPageName }) {

    useEffect(() => {
        setSpaPageName(name);
        scrollTop();
        return () => {}
    }, []);

    return (

        <>
            <Helmet>
                <title>About page...</title>
                <meta name="description" content="This is the main page" />
            </Helmet>
            <BackButton history={history} className={"back-btn"}/>

            <div className="about__text-wrap">
                <h1 className={`${name}__hero`}>
                    The <strong>motivation</strong> behind this project<br />
                </h1>

                <p className={`${name}__paragraph`}>
                    This project began from A 'Aphex twin DJ set' playlist.<br />
                    Listening to this turned out to be very interesting and enjoyable and i continuously gathered more and more items,
                    mostly by 'shazaming' shows on youtube but also by harnessing 'reddit' and 'setlist' which turned out to be
                    a great help.
                </p>
                <p className={`${name}__paragraph`}>
                    After a while this list has become very large and with a few hundred items it became
                    impossible to effectively navigate through, hence the motivation for making this minisite -
                    <strong> solely for the purpose of effectively navigating through that playlist. </strong>
                    Items are categorized by genre and year of recording, please use the provided filters for ease.
                    I guess you could label it as a fan site.
                </p>
                <p className={`${name}__paragraph`}>
                    Please use <a href="mailto:nirsegevmail@gmail.com" target="_blank" className={`${name}__link`}>this mail</a> for any inquiries,
                    reports about wrong or misleading data.<br />
                    This site is non-commercial.
                </p>
            </div>

            <h2 className={`${name}__map-header`}>
                The <strong>events</strong> are mapped here.<br />
            </h2>
            <ShowGoogleMap />

        </>

    );
}

export default About;