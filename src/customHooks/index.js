import React, { useState, useEffect } from 'react';
import { randomIntFromInterval } from '../helpers/math'


const useFetch = (url, initialValue) => {
    const [ result, setResult ] = useState(initialValue);
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setResult(data);
            })
            .catch(error => console.error(error));
    }, []);
    return result;
};

const useSetPageName = (cb, name) => {
    useEffect(() => {
        cb(name);
        return () => {}
    }, []);
};


const useMediaQuery = (query) => {
    const mediaMatch = window.matchMedia(query);
    const [ matches, setMatches ] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addListener(handler);
        return () => mediaMatch.removeListener(handler);
    });
    return matches;
};

const useShadowAnimaStyle = (x= 0, y= 0) => {
    const [ xCoor, setXCoor ] = useState(x);
    const [ yCoor, setYCoor ] = useState(y);

    let intervalHolder;

    useEffect(() => {
        intervalHolder = setInterval(() => {
        setXCoor(randomIntFromInterval(-6,6));
        setYCoor(randomIntFromInterval(-6,6));
    } ,1000);
        return () => clearInterval(intervalHolder);
    }, []);
    return {
        filter: `drop-shadow(${xCoor}px ${yCoor}px 10px purple)`
    };
};

export { useSetPageName, useFetch, useMediaQuery, useShadowAnimaStyle };