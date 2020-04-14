import React, { useEffect } from 'react';
import {Helmet} from "react-helmet";
import QuickSlide from './quickSlide';
import Items from "./items";
import { editorialData } from '../data/editorial.js';
import PropTypes from 'prop-types';
import ReactGa from 'react-ga'

function Editorial( { ...restProps } ) {
    const { name, isPlayingEmbedded, setPlayerItem, setSpaPageName } = restProps;
    console.log({editorialData});

    useEffect(() => {
        setSpaPageName(name);
        ReactGa.event({
            category: 'clicked',
            action: 'simulated a Editorial click'
        });
        return () => {}
    }, []);

    const tracks = JSON.parse(localStorage.getItem("afx_local_tracks")).data;
    const getItemsByIds = (ids, allTracks) => {return allTracks.filter(track => ids.includes(track.ID))};


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

Editorial.propTypes = {
    name: PropTypes.string,
    isPlayingEmbedded: PropTypes.func,
    setPlayerItem: PropTypes.func,
    setSpaPageName: PropTypes.func,
};

export default Editorial;