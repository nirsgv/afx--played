import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import YouTube from 'react-youtube';
import SvgSprite from "../components/svgSprite";
import { closePlayer } from '../actions'
import MoreInfoButton from "../components/moreInfoButton";

// size may also be a plain string using the presets 'large' or 'compact'

const view = 'coverart'; // or 'list'
const theme = 'black'; // or 'white'


function MultiPlayer({ platform, item, width, height, trackId, closePlayer }) {

    console.log({item, platform});
    const opts = {
            height: height / 2,
            width: width / 2,
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1
        }
    };
    const size = {
        height:height / 2,
        width:width / 2,
    };
    return (
        <section className='player__wrap'>

            {item &&
            <>
            <div className='player faded-in-from-bottom'>
                <nav className="player__close">
                    <button className="player__close-btn" onClick={closePlayer}>
                        <SvgSprite name={'TIMES'} />
                    </button>
                </nav>
                <YouTube
                    videoId={item}
                    opts={opts}
                    className={'iframe iframe--youtube'}
                    containerClassName={'player youtube'}
                />
                <nav className="player__expand">
                    <MoreInfoButton ID={trackId} />
                </nav>
            </div>
            </>
            }


        </section>
    )
};


const mapStateToProps = state => ({
    platform: state.player.platform,
    item: state.player.item,
    trackId: state.player.trackId,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    closePlayer
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MultiPlayer);