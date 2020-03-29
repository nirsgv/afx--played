import React, { useEffect } from 'react';
import {Helmet} from "react-helmet";
import QuickSlide from './quickSlide';
import Items from "./items";
import { editorialData } from '../data/editorial.js';
function Editorial(props) {
    console.log({editorialData});

    useEffect(() => {
        props.setSpaPageName(props.name);
        return () => {}
    }, []);

    const tracks = JSON.parse(localStorage.getItem("afx_local_tracks")).data;
    console.log(tracks);
    const dnbFavs = ['laurentgarnier+themanwiththeredface','shapednoise+intruder','strafe+setitoff','shawnrudiman+secrets(djmisjahremix)','blupeter+widescreen&digital']; // a list of ids handpicked for a specific genre
    const getItemsByIds = (ids, allTracks) => {return allTracks.filter(track => ids.includes(track.ID))};
    const dnbItems = getItemsByIds(dnbFavs, tracks);

    return (
        <>
            <Helmet>
                <title>About page...</title>
                <meta name="description" content="This is the editorial page" />
            </Helmet>
            <h1>About, {props.name}</h1>
            {editorialData.map(list => {
                const itemsnow = getItemsByIds(list.ITEMS, tracks);
                return (
                    <QuickSlide title={list.TITLE}>
                        <Items tracksFiltered={itemsnow} isPlayingEmbedded={props.isPlayingEmbedded} setPlayerItem={props.setPlayerItem} />
                    </QuickSlide>
                )
            })}
        </>
    );
}

export default Editorial;