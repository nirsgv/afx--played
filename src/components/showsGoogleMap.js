import React, { useEffect } from 'react';
import GoogleMapReact from "google-map-react";
import mapStyle from "../data/mapStyle";

const AnyReactComponent = ({ lat, lng, text }) => {
    return <h3>{`${lat}${lng}${text}`}</h3>
};

const handleApiLoaded = (map, maps) => {
    // use map and maps objects
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
    options: { styles: mapStyle }
};

function ShowGoogleMap(props) {

    return (
        <>

            <section className="map" style={{ height: '20rem', width: '100%' }}>

                <GoogleMapReact {...defaultMapProps} >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>

            </section>

        </>

    );
}

export default ShowGoogleMap;