import React, { useState, useEffect } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {randomIntFromInterval} from "../helpers/math";

function MultiPlayer({ sampleId }) {

    // const alt = async() => {
//     let response = await fetch(`${window.location.origin}/api/sample`)
//     let body = await response.body;
//     let data = await body.getReader();
//     let readResponse = await data.read();
//     var blob = new Blob([readResponse.value], { type: 'audio/mp3' });
//     var url = window.URL.createObjectURL(blob);
//     window.audio = new Audio();
//     window.audio.src = url;
//     window.audio.play();
//     console.log(readResponse);
//     console.log(window.audio);
//     console.log(url);
//     return await readResponse;
// };

    useEffect(() => {
        console.log(sampleId);

        return () => {}
    }, [sampleId]);

    return (
        <section className='player__wrap'>
            {sampleId}
        </section>
    )
};

const mapStateToProps = state => ({
    sampleId: state.player.sampleId,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MultiPlayer);