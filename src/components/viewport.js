import React, { useState, useEffect } from 'react';
import {debounce} from "../helpers/higherFunctions";

const ViewPort = (props) => {

    const [ internalViewportDimensions, setInternalViewportDimensions ] = useState({
        innerWidth: 0,
        innerHeight: 0,
        outerWidth: 0,
        outerHeight: 0
    });

    useEffect(() => {
        debouncedUpdateDimensions();
        window.addEventListener('resize', debouncedUpdateDimensions);

        return () => {
            window.removeEventListener('resize', debouncedUpdateDimensions);
        }
    }, []);

    const updateWindowDimensions = () => {
        const { innerWidth, innerHeight, outerWidth, outerHeight } = window;
        setInternalViewportDimensions({
            innerWidth,
            innerHeight,
            outerWidth,
            outerHeight
        });
        props.setDimensionsCb({
            innerWidth,
            innerHeight,
            outerWidth,
            outerHeight
        });
    };

    const debouncedUpdateDimensions = debounce(updateWindowDimensions, 100);

    //const { innerWidth, innerHeight, outerWidth, outerHeight } = props.viewport;

    return (
        <>
            {React.cloneElement(props.children, {
                className: "active",
                internalViewportDimensions
            })}
        </>
    );

};

export default ViewPort;