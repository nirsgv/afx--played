import React, { useState, useRef, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSampleId } from '../actions';

function MultiPlayer({ sampleId, setSampleId }) {
    const audioTagRef = useRef(null), // references the audio element
          [ player, setPlayer ] = useState('stopped'),
          [ currentTime, setCurrentTime ] = useState(null),
          [ duration, setDuration ] = useState(null),
          [ preloader, setPreloader ] = useState(false),
          [ compareTarget, setCompareTarget ] = useState(''),
          prevCountRef = useRef(),
          tracks = JSON.parse(localStorage.getItem("afx_local_tracks")).data,
          chosen = tracks.find(function(track) {
              return track.ID === sampleId;
          });

    const setTimeDisplay = (e) => {
        setCurrentTime(e.target.currentTime);
        setDuration(e.target.duration);
    };

    const showPreloader = () => setPreloader(true);
    const hidePreloader = () => setPreloader(false);

    useEffect(() => {
        // setup
        audioTagRef.current.addEventListener("timeupdate", setTimeDisplay);
        audioTagRef.current.addEventListener("loadstart", showPreloader);
        audioTagRef.current.addEventListener("canplaythrough", hidePreloader);

        prevCountRef.current = compareTarget;
        setCompareTarget(sampleId);

        if (prevCountRef.current !== prevCompareTarget && player !== "paused") {
            console.log('changed!!!');
            audioTagRef.current.src = `../assets/${sampleId}.mp3`;
            setPlayer("playing");
        } else if (sampleId && !duration && player === "playing") {
            setPlayer("playing");
            audioTagRef.current.src = `../assets/${sampleId}.mp3`;
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
    }, [ sampleId, player ]);

    const prevCompareTarget = prevCountRef.current;

    return (
        <section className={`player__wrap ${sampleId ? 'show' : 'hide'}`}>
            <h2>
                <span>{chosen && chosen.ARTIST_NAME}</span> - <span>{chosen && chosen.TRACK_TITLE}</span>
            </h2>
            {/*<h3>Now: {compareTarget}, before: {prevCompareTarget}</h3>*/}
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
                        <button onClick={() => {setSampleId('');setPlayer("paused")}}>
                            Stop
                        </button>
                    ) : (
                        ""
                    )}
                </div>}

                {/*{player === "playing" || player === "paused" ? (*/}
                    {/*<div>*/}
                        {/*{currentTime} / {duration}*/}
                    {/*</div>*/}
                {/*) : (*/}
                    {/*""*/}
                {/*)}*/}
                <audio ref={audioTagRef} />
        </section>
    )
};

const mapStateToProps = state => ({
    sampleId: state.player.sampleId,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setSampleId
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MultiPlayer);