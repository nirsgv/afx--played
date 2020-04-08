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
    const getItemsByIds = (ids, allTracks) => {return allTracks.filter(track => ids.includes(track.ID))};

    const { name, isPlayingEmbedded, setPlayerItem } = props;

    return (
        <>
            <Helmet>
                <title>About page...</title>
                <meta name="description" content="This is the editorial page" />
            </Helmet>
            <h1>About, {name}</h1>
            {editorialData.map((list, index) => {
                const itemsnow = getItemsByIds(list.ITEMS, tracks);
                return (
                    <QuickSlide title={list.TITLE} key={index}>
                        <Items tracksFiltered={itemsnow} isPlayingEmbedded={isPlayingEmbedded} setPlayerItem={setPlayerItem} />
                    </QuickSlide>
                )
            })}
        </>
    );
}

export default Editorial;