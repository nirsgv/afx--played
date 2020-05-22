import React, { useState } from 'react'
import PropTypes from 'prop-types';

const Img = (props) => {

    const [ hasFinishedLoading, setHasFinishedLoading ] = useState(false);
    const {
        src,
        alt,
        transitionSeconds,
        blockClassName,
        placeholderImg
    } = props;


    const setAssetAsLoaded = () => {
        setHasFinishedLoading(true);
        console.log('finished loading');
    };

    const style = {
        transition: `filter ${transitionSeconds}s ease-in-out`
    };

    return (
        <div className={`${blockClassName}__image-wrap`}>
            <img src={src ? src : placeholderImg}
                 alt={alt}
                 className={`${blockClassName}__image ${blockClassName}__image--${hasFinishedLoading ? 'loaded' : 'loading'}`}
                 onLoad={() => setAssetAsLoaded()}
                 onError={() => console.log('Error loading')}
                 style={style}
            />
            <img alt='placeholder-image' src={placeholderImg} className={`${blockClassName}__default-img-layer ${hasFinishedLoading ? 'hide' : 'show'}`}
            />
        </div>
    );

};

Img.defaultProps = {
    blockClassName: 'track',
    placeholderImg: '../assets/aphex-logo.svg'
};

Img.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    transitionSeconds: PropTypes.number,
    blockClassName: PropTypes.string,
    placeholderImg: PropTypes.string,
};

export default Img;