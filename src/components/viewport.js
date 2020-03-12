import React, { Component, useState, useEffect } from 'react';

const ViewPort = (props) => {

    const [ viewportDimendions, setViewportDimendions ] = useState({
        innerWidth: 0,
        innerHeight: 0,
        outerWidth: 0,
        outerHeight: 0
    });

    useEffect(() => {
        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);

        return () => {
            // updateWindowDimensions();
            window.removeEventListener('resize', updateWindowDimensions);
        }
    }, []);

    const updateWindowDimensions = () => {
        const { innerWidth, innerHeight, outerWidth, outerHeight } = window;
        setViewportDimendions({
            innerWidth,
            innerHeight,
            outerWidth,
            outerHeight
        });
    };

    const { innerWidth, innerHeight, outerWidth, outerHeight } = viewportDimendions;

    return (
        <>
            {React.cloneElement(props.children, {
                className: "active",
                innerWidth,
                innerHeight,
                outerWidth,
                outerHeight
            })}
        </>
    );

};

export default ViewPort;