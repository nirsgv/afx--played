import React, { useState, useRef, useEffect } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {randomIntFromInterval} from "../helpers/math";

function getTime(time) {
    if (!isNaN(time)) {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }
};

function MultiPlayer({ sampleId }) {

    const audioTagRef = useRef(null); // references the audio element

    const [ player, setPlayer ] = useState('stopped');
    const [ currentTime, setCurrentTime ] = useState(null);
    const [ duration, setDuration ] = useState(null);
    const [ preloader, setPreloader ] = useState(false);

    useEffect(() => {
        console.log(sampleId);

        // setup
        audioTagRef.current.addEventListener("timeupdate", e => {
            setCurrentTime(e.target.currentTime);
            setDuration(e.target.duration);
        });

        audioTagRef.current.addEventListener("loadstart", e => {
            console.log(Date.now());
            setPreloader(true);
        });

        audioTagRef.current.addEventListener("canplaythrough", e => {
            console.log(Date.now());
            setPreloader(false);
        });
        console.log(player,currentTime,duration,sampleId);

        if (sampleId && !duration ) {
            audioTagRef.current.src = "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav";
            setPlayer("playing");
        }

        if (player === "paused") {
            audioTagRef.current.pause();
            console.log("paused");
        } else if (player === "stopped") {
            audioTagRef.current.pause();
            audioTagRef.current.currentTime = 0;
        } else if (
            player === "playing"
        ) {
            setDuration(audioTagRef.current.duration);
            audioTagRef.current.play();
        }

        return () => {
            // tear down
            audioTagRef.current.removeEventListener("timeupdate", e => {});
            audioTagRef.current.removeEventListener("loadstart", e => {});
            audioTagRef.current.removeEventListener("canplaythrough", e => {});
        }
    }, [sampleId, audioTagRef.current, player]);

    return (
        <section className='player__wrap'>
            {sampleId}

                <h1>My Little Player</h1>
                {preloader ? 'preloader' : <div>
                    {player === "paused" && (
                        <button onClick={() => setPlayer("playing")}>
                            Play
                        </button>
                    )}
                    {player === "playing" && (
                        <button onClick={() => setPlayer("paused")}>
                            Pause
                        </button>
                    )}
                    {player === "playing" || player === "paused" ? (
                        <button onClick={() => setPlayer("stopped")}>
                            Stop
                        </button>
                    ) : (
                        ""
                    )}
                </div>}

                {player === "playing" || player === "paused" ? (
                    <div>
                        {currentTime} / {duration}
                    </div>
                ) : (
                    ""
                )}
                <audio ref={audioTagRef} />
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