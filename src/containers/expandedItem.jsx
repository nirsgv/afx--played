import React, {useState, useEffect} from 'react';
import {bindActionCreators} from "redux";
import {toggleShareExpansion, setPlayerItem, dispatchMessageToModal, setSpaPageName} from "../actions/index";
import {connect} from "react-redux";
import ExternalLinks from '../components/externalLinks';
import Concerts from '../components/concerts';
import DefinitionList from '../components/definitionList';
import Tags from "../components/tags";
import Spinner from '../components/spinner';
import {getDurationFromSeconds} from '../helpers/str';
import {getTrack} from '../helpers/api';
import {useAsync} from '../customHooks';
import Share from "../components/share";
import {scrollTop} from '../helpers/dom';
import BackButton from "../components/backButton";

// "main (extra)", or just whichever part exists; tracks don't all have every field.
const withExtra = (main, extra) => {
    if (main && extra) return `${main} (${extra})`;
    return main || extra || '—';
};

const ExpandedItem = ({ match, history, toggleShareExpansion, dispatchMessageToModal, setSpaPageName }) => {

    useEffect(() => {
        setSpaPageName && setSpaPageName('expanded-item');
        scrollTop();
    }, []);

    const [entranceClassName, setEntranceClassName] = useState('faded-in-from-bottom');
    const id = decodeURIComponent(match.params.id);
    const { data: track, error, loading } = useAsync(() => getTrack(id), id);

    if (loading) return <Spinner label="Loading track" />;

    if (error || !track) {
        return (
            <div className="expanded-item__wrap">
                <nav className="back-btn__wrap expanded-item__back">
                    <BackButton history={history} className={"back-btn"}/>
                </nav>
                <h2 className="expanded-item__none">
                    {error ? "Couldn't load this track. Please try again." : 'Track not found.'}
                </h2>
            </div>
        );
    }

    const {
        ARTIST_NAME,
        ALBUM_TITLE,
        TRACK_TITLE,
        RECORD_LABEL,
        CAT,
        DURATION,
        YEAR,
        GENRES = [],
        LINKS = {},
        ID,
        ALBUM_ID,
        VENUES = []
    } = track;

    return (
        <>
            {ALBUM_ID && (
                <div className="bkg__wrap">
                    <div className="bkg__layer"
                         style={{backgroundImage: `url(../assets/album_covers/160x160pp/${ALBUM_ID}.jpg)`}}/>
                </div>
            )}

            <div className={`animate-content ${entranceClassName}`} onAnimationEnd={() => setEntranceClassName('')}>
                <div className={`expanded-item__wrap`}>

                    <nav className="back-btn__wrap expanded-item__back">
                        <BackButton history={history} className={"back-btn"}/>
                    </nav>

                    <div className="row">
                        <div className="details-and-shows">
                            <section className="expanded-item__details">
                                <h2 className="expanded-item__section-title">Track Details</h2>
                                <h3><DefinitionList classNameSpace={'inner-item'} term={'Artist'}
                                                    definition={ARTIST_NAME}/></h3>
                                <h3><DefinitionList classNameSpace={'inner-item'} term={'Track'}
                                                    definition={withExtra(TRACK_TITLE, DURATION ? getDurationFromSeconds(DURATION) : '')}/>
                                </h3>
                                <h3><DefinitionList classNameSpace={'inner-item'} term={'Album'}
                                                    definition={withExtra(ALBUM_TITLE, YEAR)}/></h3>
                                <h3><DefinitionList classNameSpace={'inner-item'} term={'Label'}
                                                    definition={withExtra(RECORD_LABEL, CAT)}/></h3>
                                <h3><DefinitionList classNameSpace={'inner-item'} term={'Genres'}
                                                    definition={<Tags className="track__track-tags" tags={GENRES}/>}/>
                                </h3>
                            </section>

                            <section className="expanded-item__shows">
                                <h2 className="expanded-item__section-title">Played in shows</h2>
                                <Concerts venues={VENUES}/>
                            </section>
                        </div>

                        <div className="links-and-share">
                            <section className="expanded-item__external-links">
                                <h2 className="expanded-item__section-title">External Links</h2>
                                <ExternalLinks className="track__track-links" links={LINKS} ID={ID}
                                               blockClassName={'external-links'}/>
                            </section>

                            <section className="expanded-item__share">
                                <h2 className="expanded-item__section-title">Share</h2>
                                <Share url={window.location.href}
                                       onShareWindowClose={toggleShareExpansion}
                                       dispatchMessageToModal={dispatchMessageToModal}
                                />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};


const mapStateToProps = state => ({});

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
