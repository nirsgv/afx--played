import React from 'react';
import { bindActionCreators } from "redux";
import { removeMessageToModal } from "../actions/index";
import { connect } from "react-redux";
import YouTube from 'react-youtube';
import SpotifyPlayer from 'react-spotify-player';
import { Link } from "react-router-dom";


// size may also be a plain string using the presets 'large' or 'compact'

const view = 'coverart'; // or 'list'
const theme = 'black'; // or 'white'


function MultiPlayer({ isPlayingEmbedded, platform, item, width, height, trackId }) {

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

            {isPlayingEmbedded &&
            <div className='player'>
                {((platform) => {
                    switch(platform) {
                        case 'youtube':
                            return (<YouTube
                                videoId={item}
                                opts={opts}
                                className={'iframe iframe--youtube'}
                                containerClassName={'player youtube'}
                            />);
                        case 'spotify':
                            return (<SpotifyPlayer
                                uri={`spotify:track:${item}`}
                                size={size}
                                view={view}
                                theme={theme}
                                className={'iframe iframe--spotify'}
                            />);
                        case 'deezer':
                            return null;
                        default:
                            return null;
                    }
                })(platform)}
            </div>}


            {isPlayingEmbedded &&
            <div className="player__expand-item">
                <Link to={`track/${trackId}`} className={"btn btn--full-size href--expand"}>expand</Link>
            </div>
            }


            {/*customHistory.push('/')*/}
        </section>
    )
};


const mapStateToProps = state => ({
    isPlayingEmbedded: state.player.isPlayingEmbedded,
    platform: state.player.platform,
    item: state.player.item,
    trackId: state.player.trackId,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MultiPlayer);