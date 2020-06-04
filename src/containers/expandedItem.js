import React, { useState, useEffect } from 'react';
import { bindActionCreators } from "redux";
import {toggleShareExpansion, setPlayerItem, dispatchMessageToModal, setSpaPageName } from "../actions/index";
import { connect } from "react-redux";
import ExternalLinks from '../components/externalLinks';
import Concerts from '../components/concerts';
import DefinitionList from '../components/definitionList';
import Tags from "../components/tags";
import { getDurationFromSeconds } from '../helpers/str';
import Share from "../components/share";
import { Router } from "react-router-dom";
import { scrollTop } from '../helpers/dom';
import BackButton from "../components/backButton";

const ExpandedItem = ({match, history, toggleShareExpansion, setPlayerItem, dispatchMessageToModal, setSpaPageName}) => {

    useEffect(() => {
        console.log(decodeURIComponent(match.params.id));
        setSpaPageName && setSpaPageName('expanded-item');
        scrollTop();
        //console.log('match', match, tracks, chosen, history, dispatchMessageToModal);
        return () => {

        }
    }, []);


    const [ beenAnimated, setBeenAnimated ] = useState(false),
          tracks = JSON.parse(localStorage.getItem("afx_local_tracks")).data,
          expandedTrack = tracks.find(function(track) {
        return track.ID === decodeURIComponent(match.params.id);
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
                <nav className="back-btn__wrap expanded-item__back">
                    <BackButton history={history} className={"back-btn"} />
                </nav>

                {/*block2*/}
                <div className="row">
                    <div className="details-and-shows">
                        <section className="expanded-item__details">
                            <h2 className="expanded-item__section-title">Track Details</h2>
                            <h3><DefinitionList classNameSpace={'inner-item'} term={'Artist'} definition={ARTIST_NAME} /></h3>
                            <h3><DefinitionList classNameSpace={'inner-item'} term={'Track'} definition={`${TRACK_TITLE} (${getDurationFromSeconds(DURATION)})`}/></h3>
                            <h3><DefinitionList classNameSpace={'inner-item'} term={'Album'} definition={`${ALBUM_TITLE} (${YEAR})`} /></h3>
                            <h3><DefinitionList classNameSpace={'inner-item'} term={'Label'} definition={`${RECORD_LABEL} (${CAT})`} /></h3>
                            <h3><DefinitionList classNameSpace={'inner-item'} term={'Label'} definition={<Tags className="track__track-tags" tags={GENRES}/>} /></h3>

                        </section>

                        {/*block3*/}
                        {VENUES[0] && (
                        <section className="expanded-item__shows">
                            <h2 className="expanded-item__section-title">Played in shows</h2>
                            <Concerts venues={VENUES}></Concerts>
                        </section>)}
                    </div>

                    <div className="links-and-share">

                        {/*block4*/}
                        <section className="expanded-item__external-links">
                            <h2 className="expanded-item__section-title">External Links</h2>
                            <ExternalLinks className="track__track-links" links={LINKS} ID={ID} />

                        </section>

                        {/*block5*/}
                        <section className="expanded-item__share">
                            <h2 className="expanded-item__section-title">Share</h2>
                            <Share url={'http://localhost:3000/track/fis+patupaiarehe'}
                                   onShareWindowClose={toggleShareExpansion}
                                   dispatchMessageToModal={dispatchMessageToModal}
                            />
                        </section>
                    </div>


                </div>




                {/*<h3 className={'concerts__title'}>{'Available streams:'.toUpperCase()}:</h3>*/}
                {/*<h3 className={'concerts__title'}>{'Played in shows'.toUpperCase()}:</h3>*/}
            </div>
        </>
    )
};


const mapStateToProps = state => ({
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