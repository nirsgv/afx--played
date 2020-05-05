import React, { useState, useRef, useEffect } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";



function MultiPlayer({ sampleId }) {
    const audioTagRef = useRef(null), // references the audio element
          [ player, setPlayer ] = useState('stopped'),
          [ currentTime, setCurrentTime ] = useState(null),
          [ duration, setDuration ] = useState(null),
          [ preloader, setPreloader ] = useState(false),
          [ compareTarget, setCompareTarget ] = useState(''),
          prevCountRef = useRef();

    const setTimeDisplay = (e) => {
        setCurrentTime(e.target.currentTime);
        setDuration(e.target.duration);
    };
    const showPreloader = () => setPreloader(true);
    const hidePreloader = () => setPreloader(false);

    useEffect(() => {
        console.log(sampleId);
        prevCountRef.current = compareTarget;
        setCompareTarget(sampleId);
        if(sampleId !== prevCountRef) {console.log('changed!!!')}
        // setup
        audioTagRef.current.addEventListener("timeupdate", setTimeDisplay);
        audioTagRef.current.addEventListener("loadstart", showPreloader);
        audioTagRef.current.addEventListener("canplaythrough", hidePreloader);

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
        } else if (player === "playing") {
            setDuration(audioTagRef.current.duration);
            audioTagRef.current.play();
        }

        return () => {
            // tear down
            audioTagRef.current.removeEventListener("timeupdate", setTimeDisplay);
            audioTagRef.current.removeEventListener("loadstart", showPreloader);
            audioTagRef.current.removeEventListener("canplaythrough", hidePreloader);
        }
    }, [sampleId, audioTagRef.current, player]);

    const prevCompareTarget = prevCountRef.current;

    return (
        <section className='player__wrap'>
            {sampleId}

                {/*<h1>My Little Player</h1>*/}
            <h3>Now: {compareTarget}, before: {prevCompareTarget}</h3>
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