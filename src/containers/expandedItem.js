import React, { useState, useEffect } from 'react';
import { bindActionCreators } from "redux";
import {toggleShareExpansion, setPlayerItem, dispatchMessageToModal, setSpaPageName } from "../actions/index";
import { connect } from "react-redux";
import Links from '../components/links';
import Concerts from '../components/concerts';
import DefinitionList from '../components/definitionList';
import Tags from "../components/tags";
import { getDurationFromSeconds } from '../helpers/str';
import Share from "../components/share";
import {Router} from "react-router-dom";

const ExpandedItem = ({match, history, toggleShareExpansion, setPlayerItem, dispatchMessageToModal, setSpaPageName}) => {

    useEffect(() => {
        console.log(setSpaPageName);
        setSpaPageName && setSpaPageName('expanded-item');
        return () => {

        }
    }, []);

    const [beenAnimated, setBeenAnimated] = useState(false),
          tracks = JSON.parse(localStorage.getItem("afx_local_tracks")).data,
          chosen = tracks.find(function(track) {
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
        IMAGES,
        VENUES
    } = chosen;

    //console.log(IMAGES);
    return (
        <>
        <div className="bkg__wrap">
            <div className="bkg__layer"  style={{backgroundImage: `url(../assets/album_covers/album_image_${ID}.jpg)`}} />
        </div>
        <div className="inner-page__wrap">
            <div className={`inner-page__content${!beenAnimated ? ' inner-page__content--animated' : ''}`} onAnimationEnd={() => setBeenAnimated(true)}>
                <h3><DefinitionList classNameSpace={'inner-item'} term={'Artist'} definition={ARTIST_NAME} /></h3>
                <h3><DefinitionList classNameSpace={'inner-item'} term={'Track'} definition={`${TRACK_TITLE} (${getDurationFromSeconds(DURATION)})`}/></h3>
                <h3><DefinitionList classNameSpace={'inner-item'} term={'Album'} definition={`${ALBUM_TITLE} (${YEAR})`} /></h3>
                <h3><DefinitionList classNameSpace={'inner-item'} term={'Label'} definition={`${RECORD_LABEL} (${CAT})`} /></h3>
                <Tags className="track__track-tags" tags={GENRES} />
                {/*<SvgSprite classes={'icon-logo'} src={imgData.sprite.src} alt={imgData.sprite.description} name={'SHARE'} */}
                {/*           onClick={() => toggleShareExpansion(false)} />*/}
                <Share url={'http://localhost:3000/track/fis+patupaiarehe'}
                       onShareWindowClose={toggleShareExpansion}
                       dispatchMessageToModal={dispatchMessageToModal}/>

                <h3 className={'concerts__title'}>{'Available streams:'.toUpperCase()}:</h3>
                <Links className="track__track-links" links={LINKS} setPlayerItem={setPlayerItem} isMountedByExpanded={true} history={history} ID={ID}/>
                <h3 className={'concerts__title'}>{'Played in shows'.toUpperCase()}:</h3>
               <Concerts venues={VENUES}></Concerts>
            </div>
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