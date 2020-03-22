import React from 'react';
import {Helmet} from "react-helmet";
import QuickSlide from './quickSlide';
import Slider from './slider';
import List from "./list";
import Items from "./items";
function Editorial(props) {

    const tracks = JSON.parse(localStorage.getItem("afx_local_tracks")).data;
    console.log(tracks);
    const dnbFavs = ['laurentgarnier+themanwiththeredface','shapednoise+intruder','strafe+setitoff','shawnrudiman+secrets(djmisjahremix)','blupeter+widescreen&digital']; // a list of ids handpicked for a specific genre
    const getItemsByIds = (ids, allTracks) => {return allTracks.filter(track => ids.includes(track.ID))}
    const dnbItems = getItemsByIds(dnbFavs, tracks);

    return (
        <>
            <Helmet>
                <title>About page...</title>
                <meta name="description" content="This is the main page" />
            </Helmet>
            <h1>About, {props.name}</h1>


            <QuickSlide >

                <Items tracksFiltered={dnbItems} isPlayingEmbedded={props.isPlayingEmbedded} setPlayerItem={props.setPlayerItem} />
            </QuickSlide>
        </>

    );
}

export default Editorial;