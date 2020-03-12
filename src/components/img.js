import React, { useState } from 'react'
const defaultPlaceholderImg = 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Big_Poster.jpg/220px-Big_Poster.jpg';


const Img = (props) => {

    const [ hasFinishedLoading, setHasFinishedLoading ] = useState(false);
    const {
        src, alt, transitionSeconds, blockClassName = 'track',
        placeholderImg ='https://flypaper.soundfly.com/wp-content/uploads/2018/07/aphex-header.jpg'} = props;


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
        </div>
    );

}

export default Img;