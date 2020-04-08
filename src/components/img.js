import React, { useState } from 'react'
const defaultPlaceholderImg = 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Big_Poster.jpg/220px-Big_Poster.jpg';


const Img = (props) => {

    const [ hasFinishedLoading, setHasFinishedLoading ] = useState(false);
    const {
        src,
        alt,
        transitionSeconds,
        blockClassName = 'track',
        placeholderImg ='../assets/aphex-logo.svg'
    } = props;


    const setAssetAsLoaded = () => {
        setHasFinishedLoading(true);
        console.log('finished loading');
    };

    const style = {
        transition: `filter ${transitionSeconds}s ease-in-out`
    };

    return (
        <div className={`${blockClassName}__image-wrap`} style={{'position': 'relative'}}>
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

export default Img;