import React, { useState, useEffect } from 'react';
import {debounce} from "../helpers/higherFunctions";
import PropTypes from 'prop-types';
import SwitchButton from "./switchButton";

const ViewPort = ({ children, setDimensionsCb }) => {

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
        setDimensionsCb({
            innerWidth,
            innerHeight,
            outerWidth,
            outerHeight
        });
    };
    const debouncedUpdateDimensions = debounce(updateWindowDimensions, 100);

    return (
        <>
            {children && React.cloneElement(children, {
                className: "active",
                internalViewportDimensions
            })}
        </>
    );

};

ViewPort.propTypes = {
    children: PropTypes.element.isRequired,
    setDimensionsCb: PropTypes.func,
};

export default ViewPort;