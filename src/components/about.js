import React, { useEffect } from 'react';
import { Helmet } from "react-helmet";
import BackButton from "./backButton";
import ShowGoogleMap from "./showsGoogleMap";


const AnyReactComponent = ({ lat, lng, text }) => {
    return <h3>{`${lat}${lng}${text}`}</h3>
};

const handleApiLoaded = (map, maps) => {
    // use map and maps objects
};

const defaultMapProps = {
    center: {lat: 40.73, lng: -73.93},
    zoom: 12,
    bootstrapURLKeys: { key: 'AIzaSyCKj8YlOvnus07jxLryEGnHrITN2z8a0_I' },
    yesIWantToUseGoogleMapApiInternals: true,
    onGoogleApiLoaded: ({ map, maps }) => handleApiLoaded(map, maps),
};

function About(props) {

    useEffect(() => {
        props.setSpaPageName(props.name);
        return () => {}
    }, []);



    return (

        <>
            <Helmet>
                <title>About page...</title>
                <meta name="description" content="This is the main page" />
            </Helmet>
            <BackButton history={props.history} className={"back-btn"}/>

            <h1>About, {props.name}</h1>
asdasd
            <ShowGoogleMap />

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