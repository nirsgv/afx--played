import React, { useEffect } from 'react';
import {Helmet} from "react-helmet";

function About(props) {

    useEffect(() => {
        props.setSpaPageName('about');
        return () => {}
    }, []);



    return (
        <>
            <Helmet>
                <title>About page...</title>
                <meta name="description" content="This is the main page" />
            </Helmet>
            <h1>About, {props.name}</h1>

            <form>
                <label>
                    From:
                    <input type="text" name="name" />
                </label>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>

    );
}

export default About;