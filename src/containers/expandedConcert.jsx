import React, {useEffect, useState} from 'react';
import {bindActionCreators} from "redux";
import {toggleShareExpansion, setPlayerItem, setSpaPageName} from "../actions/index";
import {connect} from "react-redux";
import {getMonthFromShort, getDurationFromSeconds} from '../helpers/str';
import {Link} from "react-router-dom";
import {scrollTop} from '../helpers/dom';
import SvgSprite from "../components/svgSprite";
import BackButton from "../components/backButton";
import MoreInfoButton from "../components/moreInfoButton";
import Spinner from "../components/spinner";
import {getShow, searchTracks} from '../helpers/api';
import {useAsync} from '../customHooks';

const ExpandedConcert = ({match, history, setSpaPageName}) => {

    useEffect(() => {
        setSpaPageName('expanded-concert');
        scrollTop();
        return () => {
        }
    }, []);
    const [entranceClassName, setEntranceClassName] = useState('faded-in-from-bottom');

    const id = decodeURIComponent(match.params.id);

    // The show and the tracks played at it, both from the API.
    const {data, error, loading} = useAsync(async () => {
        const [concert, page] = await Promise.all([
            getShow(id),
            searchTracks({venues: [id], limit: 100}),
        ]);
        return {concert, tracksCollected: page.items};
    }, id);

    if (loading) return <Spinner label="Loading show"/>;

    if (error || !data.concert) {
        return (
            <div className={"inner-page__wrap"}>
                <nav className="back-btn__wrap expanded-item__back">
                    <BackButton history={history} className={"back-btn"}/>
                </nav>
                <h2 className="expanded-item__none">
                    {error ? "Couldn't load this show. Please try again." : 'Show not found.'}
                </h2>
            </div>
        );
    }

    const {concert, tracksCollected} = data;
    const {SHOW_TITLE, SHOW_LOCATION = {}, SHOW_DATE = {}} = concert;


    return (
        <div className={"inner-page__wrap"}>
            <nav className="back-btn__wrap expanded-item__back">
                <BackButton history={history} className={"back-btn"}/>
            </nav>
            <div className={`animate-content ${entranceClassName}`} onAnimationEnd={() => setEntranceClassName('')}>

                <div className={"inner-page__inner"}>
                    <h1 className="expanded-concert__title">
                        {SHOW_TITLE}
                    </h1>
                    <h2 className="expanded-concert__location">
                        {`${SHOW_LOCATION.COUNTRY} ${SHOW_LOCATION.CITY} ${SHOW_LOCATION.VENUE}, ${SHOW_DATE.DAY} ${getMonthFromShort(SHOW_DATE.MONTH)} ${SHOW_DATE.YEAR}`}
                    </h2>
                    <h3 className="expanded-concert__date">

                    </h3>
                    <ul className={"expanded-concert__list"}>
                        {tracksCollected.map((item, index) => {
                            return (
                                <li key={index} className={"expanded-concert__item"}>
                                    <Link className={'expanded-concert__link'} to={`/track/${encodeURIComponent(item.ID)}`}>
                                        <h3>
                                            <div className="concert-tracks concert-tracks__row">
                                                <span className="concert-tracks__artist">{item.ARTIST_NAME}</span>
                                                <div>
                                                    <span className="concert-tracks__title">{item.TRACK_TITLE}</span>
                                                    {item.DURATION ? <span
                                                        className="concert-tracks__duration">, {getDurationFromSeconds(item.DURATION)}</span> : null}
                                                </div>
                                                <MoreInfoButton/>

                                                {/*<span className="concert-tracks__cta internal-links__cta">*/}
                                                {/*<h4>More Info*/}
                                                {/*<SvgSprite name={'LONG_ARROW_RIGHT'} />*/}
                                                {/*</h4>*/}
                                                {/*</span>*/}
                                            </div>
                                        </h3>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
};


const mapStateToProps = state => ({
    //appData: state.appData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleShareExpansion,
    setPlayerItem,
    setSpaPageName
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExpandedConcert);