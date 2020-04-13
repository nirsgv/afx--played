import React, { useState, useEffect } from 'react';



const useFetch = (url, initialValue) => {
    const [result, setResult] = useState(initialValue);
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
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addListener(handler);
        return () => mediaMatch.removeListener(handler);
    });
    return matches;
};

const useShadowAnimaStyle = (x) => {
    const [xCoor, setXCoor] = useState(x);
    const [yCoor, setYCoor] = useState(x);


    setTimeout(() => {setXCoor(xCoor+1)} ,500);

    useEffect(() => {

    });
    return {
        filter: `drop-shadow(${xCoor}px 4px 10px red)`
    };
};

export { useSetPageName, useFetch, useMediaQuery, useShadowAnimaStyle };