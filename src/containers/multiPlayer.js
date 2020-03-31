import React from 'react';
import { bindActionCreators } from "redux";
import { removeMessageToModal } from "../actions/index";
import { connect } from "react-redux";
import YouTube from 'react-youtube';
import SpotifyPlayer from 'react-spotify-player';
import { Link } from "react-router-dom";
import SvgSprite from "../components/svgSprite";
import {imgData} from "../data/localImgData";


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

            {isPlayingEmbedded && item &&
            <div className='player faded-in-from-bottom'>
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


            {isPlayingEmbedded && item &&
            <nav className="expend-played__wrap faded-in-from-bottom">
                <Link to={`track/${trackId}`} className={"expend-played__button"}>
                    <span className={"expend-played__text"}>expand</span>
                    <SvgSprite classes={"expend-played__icon"} src={imgData.sprite.src} alt={imgData.sprite.description} name={'LONG_ARROW_RIGHT'} />

                </Link>
            </nav>
            }

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