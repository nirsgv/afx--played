import React, { useState, useEffect } from 'react';
import { randomIntFromInterval } from '../helpers/math'
import { debounce, throttle }  from '../helpers/higherFunctions'

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

const useShadowAnimaStyle = (x= 0, y= 0, moveAmt = 1) => {
    const [ xCoor, setXCoor ] = useState(x);
    const [ yCoor, setYCoor ] = useState(y);
    let intervalHolder;

    useEffect(() => {
        intervalHolder = setInterval(() => {
        setXCoor(randomIntFromInterval(-moveAmt,moveAmt));
        setYCoor(randomIntFromInterval(-moveAmt,moveAmt));
    } ,1000);
        return () => clearInterval(intervalHolder);
    }, []);

    return {
        filter: `drop-shadow(${2+xCoor}px ${4+yCoor}px 8px #6d8c7899)`
    };
};


const useIsScrolled = () => {

    const [scrollY, setScrollY] = useState(window.pageYOffset || document.documentElement.scrollTop);
    const listener = (e) => {
        setScrollY(window.pageYOffset || document.documentElement.scrollTop);
    };
    const delay = 500;

    useEffect(() => {
        window.addEventListener('scroll', throttle(listener, delay));
        return () => {
            window.removeEventListener('scroll', listener);
        };
    });

    return scrollY > 0;
};

export { useSetPageName, useFetch, useMediaQuery, useShadowAnimaStyle, useIsScrolled };