import React from 'react'

export default ( { src , className, alt } ) => {
    return (
        <div className={`icon-${className}`}>
            <img src={'https://www.ucf.edu/files/2017/12/BIG-COLLAGE.jpg'} alt={alt} className='logo-entrance-animate'/>
        </div>
    )
}