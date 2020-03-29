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


export { useSetPageName, useFetch };