import React from 'react';
import {Helmet} from "react-helmet";

function About(props) {

    return (
        <>
            <Helmet>
                <title>About page...</title>
                <meta name="description" content="This is the main page" />
            </Helmet>
            <h1>About, {props.name}</h1>
        </>

    );
}

export default About;