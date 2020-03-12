import React from 'react';
import { bindActionCreators } from "redux";
import { removeMessageToModal } from "../actions/index";
import { connect } from "react-redux";
import YouTube from 'react-youtube';
import SpotifyPlayer from 'react-spotify-player';



// size may also be a plain string using the presets 'large' or 'compact'

const view = 'coverart'; // or 'list'
const theme = 'black'; // or 'white'


const MultiPlayer = ({ isPlayingEmbedded, platform, item, width, height }) => {

    console.log(platform);
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
        <section className='player player__wrap'>
            <div className='player'>
                {((platform) => {
                    switch(platform) {
                        case 'youtube':
                            return (<YouTube
                                videoId={item}
                                opts={opts}
                            />);
                        case 'spotify':
                            return (<SpotifyPlayer
                                uri={`spotify:track:${item}`}
                                size={size}
                                view={view}
                                theme={theme}
                            />);
                        case 'deezer':
                            return null;
                        default:
                            return null;
                    }
                })(platform)}
            </div>
        </section>
    )
};


const mapStateToProps = state => ({
    isPlayingEmbedded: state.player.isPlayingEmbedded,
    platform: state.player.platform,
    item: state.player.item,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MultiPlayer);