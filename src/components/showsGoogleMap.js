import React, { useState, useEffect } from 'react';
import GoogleMapReact from "google-map-react";
import mapStyle from "../data/mapStyle";
import urlConstants from "../data/urlConstants";
import { Link } from "react-router-dom";
import SvgSprite from "./svgSprite";



const handleApiLoaded = (map, maps) => {
    console.log(maps);

};

const defaultMapProps = {
    center: {lat: 51.509865, lng: -0.118092},
    zoom: 1,
    bootstrapURLKeys: {
        key: 'AIzaSyCKj8YlOvnus07jxLryEGnHrITN2z8a0_I',
        language: 'en'
    },
    yesIWantToUseGoogleMapApiInternals: true,
    onGoogleApiLoaded: ({ map, maps }) => handleApiLoaded(map, maps),
    disableDefaultUI: true, // disable default map UI
    draggable: true, // make map draggable
    keyboardShortcuts: false, // disable keyboard shortcuts
    scaleControl: true, // allow scale controle

    options: { styles: mapStyle }
};

const getRnd = () => {
  return Math.floor(Math.random() * 2000) - 1000;
};

const getLeftToComma = (str) => {
  return str.split(',')[0]
};

const ShowGooglePin = ({ text = '', id='' }) => <Link to={`concert/${encodeURIComponent(id)}`} className={'google-map google-map__link'}>
    <SvgSprite classes={`google-map__icon`} name={'POINTER'} />
    <span className={'google-map google-map__text'}>
        {text}
    </span>
    </Link>;

function ShowGoogleMap(props) {

    const [ shows, setShows ] = useState([]);

    useEffect(() => {
        fetch(window.location.origin + urlConstants.SHOWS_URL)
            .then(response => response.json())
            .then(data => setShows(data))
    }, []);

    return (
        <>

            <section className="google-map google-map__wrap" style={{ height: '30rem', width: '100%' }}>
                {/*{shows.toString()}*/}

                {shows && shows.length > 0 && <GoogleMapReact {...defaultMapProps}>
                    {shows.map((show, index) => <ShowGooglePin
                        key={index}
                        lat={show.SHOW_LOCATION.SHOW_GEO.LAT}
                        lng={show.SHOW_LOCATION.SHOW_GEO.LNG}
                        id={show.SHOW_ID}
                        text={getLeftToComma(show.SHOW_TITLE)} />
                    )}
                </GoogleMapReact>}

            </section>

        </>

    );
}

export default ShowGoogleMap;