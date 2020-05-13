import React, { component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'react-h5-audio-player/lib/styles.css';
import ReactAudioPlayer from 'react-audio-player';
import AudioPlayer from "react-h5-audio-player";





const alt = async () => {
    window.audio = new Audio();
    
    let response = await fetch(`${window.location.origin}/api/sample`)
    let body = await response.body;
    let data = await body.getReader();
    let readResponse = await data.read();

    var blob = await new Blob([readResponse.value], { type: 'audio/mp3' });
    var url = await window.URL.createObjectURL(blob);
    window.audio.src = url;
    window.audio.play();
    // console.log(readResponse);
    // console.log(window.audio);
    // console.log(url);

    return blob;
};

// const alt = () => {
//     alert(123);
//     fetch(`${window.location.origin}/api/sample`)
//     //.then(response => response.json())
//     .then(data => {
//         console.log(data)
//     })
//     .catch(error => console.error(error));
// };

function SamplePlayer({ sampleUrl }) {

    const [a, setA] = useState('');



    useEffect(() => {
        alt();

        return () => {

        }
    }, [sampleUrl]);


    return (
        <li className={`sample-player`}>


        </li>
    )
}

SamplePlayer.defaultProps = {

};

SamplePlayer.propTypes = {

};

export default SamplePlayer;