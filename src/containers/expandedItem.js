import React, { useState, useEffect } from 'react';
import { bindActionCreators } from "redux";
import {toggleShareExpansion, setPlayerItem, dispatchMessageToModal, setSpaPageName } from "../actions/index";
import { connect } from "react-redux";
import Links from '../components/links';
import Concerts from '../components/concerts';
import DefinitionList from '../components/definitionList';
import Img from '../components/img';
import SvgSprite from "../components/svgSprite";
import { imgData } from "../data/localImgData";
import Tags from "../components/tags";
import { getDurationFromSeconds } from '../helpers/str';
import Share from "../components/share";
import {Router} from "react-router-dom";

const ExpandedItem = ({match, history, toggleShareExpansion, isPlayingEmbedded, setPlayerItem, dispatchMessageToModal, setSpaPageName}) => {

    useEffect(() => {
        console.log(setSpaPageName);
        setSpaPageName && setSpaPageName('expanded-item');
        //console.log('match', match, tracks, chosen, history, dispatchMessageToModal);
        return () => {

        }
    }, []);

    const [beenAnimated, setBeenAnimated] = useState(false),
          tracks = JSON.parse(localStorage.getItem("afx_local_tracks")).data,
          expandedTrack = tracks.find(function(track) {
        return track.ID === match.params.id;
    });


    const {
        ARTIST_NAME,
        ALBUM_TITLE,
        TRACK_TITLE,
        RECORD_LABEL,
        CAT,
        DURATION,
        YEAR,
        GENRES,
        LINKS,
        ID,
        ALBUM_ID,
        VENUES
    } = expandedTrack;

    return (
        <>
        <div className="bkg__wrap">
            <div className="bkg__layer"  style={{backgroundImage: `url(../assets/album_covers/160x160pp/${ALBUM_ID}.jpg)`}} />
        </div>




            <div className={`expanded-item__wrap${!beenAnimated ? ' expanded-item__content--animated' : ''}`} onAnimationEnd={() => setBeenAnimated(true)}>


                {/*block1*/}
                <div className="back-btn__wrap expanded-item__back">
                    <button onClick={history.length > 0 ? history.goBack : null} className={"back-btn__button"}>back</button>
                </div>

                {/*block2*/}
                <div className="row">
                    <div className="details-and-shows">
                        <div className="expanded-item__details">
                            <h3><DefinitionList classNameSpace={'inner-item'} term={'Artist'} definition={ARTIST_NAME} /></h3>
                            <h3><DefinitionList classNameSpace={'inner-item'} term={'Track'} definition={`${TRACK_TITLE} (${getDurationFromSeconds(DURATION)})`}/></h3>
                            <h3><DefinitionList classNameSpace={'inner-item'} term={'Album'} definition={`${ALBUM_TITLE} (${YEAR})`} /></h3>
                            <h3><DefinitionList classNameSpace={'inner-item'} term={'Label'} definition={`${RECORD_LABEL} (${CAT})`} /></h3>
                            <Tags className="track__track-tags" tags={GENRES}/>
                        </div>

                        {/*block3*/}
                        <div className="expanded-item__shows">
                            <Concerts venues={VENUES}></Concerts>
                        </div>
                    </div>

                    <div className="links-and-share">

                        {/*block4*/}
                        <div className="expanded-item__external-links">
                            <Links className="track__track-links" links={LINKS} isPlayingEmbedded={isPlayingEmbedded} setPlayerItem={setPlayerItem} isMountedByExpanded={true} history={history} ID={ID}/>
                        </div>

                        {/*block5*/}
                        <div className="expanded-item__share">
                            <Share url={'http://localhost:3000/track/fis+patupaiarehe'}
                                   onShareWindowClose={toggleShareExpansion}
                                   dispatchMessageToModal={dispatchMessageToModal}
                            />
                        </div>
                    </div>


                </div>




                {/*<h3 className={'concerts__title'}>{'Available streams:'.toUpperCase()}:</h3>*/}
                {/*<h3 className={'concerts__title'}>{'Played in shows'.toUpperCase()}:</h3>*/}
            </div>
        </>
    )
};


const mapStateToProps = state => ({
    isPlayingEmbedded: state.player.isPlayingEmbedded,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleShareExpansion,
    setPlayerItem,
    dispatchMessageToModal,
    setSpaPageName
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExpandedItem);