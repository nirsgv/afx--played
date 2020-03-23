import React, { useEffect } from 'react';
import { bindActionCreators } from "redux";
import {toggleShareExpansion, setPlayerItem, setSpaPageName } from "../actions/index";
import { connect } from "react-redux";
import { getMonthFromShort, getDurationFromSeconds } from '../helpers/str';
import {Link} from "react-router-dom";
const ExpandedConcert = ({match, setSpaPageName}) => {

    useEffect(() => {
        setSpaPageName('expanded-concert');
        return () => {}
    }, []);

    const concertsData = JSON.parse(localStorage.getItem("afx_local_shows")).data,
          tracks = JSON.parse(localStorage.getItem("afx_local_tracks")).data,
          concert = concertsData[match.params.id],
          tracksCollected = tracks.filter((track) => track.VENUES.includes(match.params.id));

    const {SHOW_TITLE, SHOW_LOCATION, SHOW_DATE} = concert;


    return (
        <div className={"inner-page__wrap"}>
            <div className={"inner-page__inner"}>
                <h1 className="expanded-concert__title">
                    {SHOW_TITLE}
                </h1>
                <h2 className="expanded-concert__location">
                    {`${SHOW_LOCATION.COUNTRY} ${SHOW_LOCATION.CITY} ${SHOW_LOCATION.VENUE}`}
                </h2>
                <h3 className="expanded-concert__date">
                    {`${SHOW_DATE.DAY} ${getMonthFromShort(SHOW_DATE.MONTH)} ${SHOW_DATE.YEAR}`}
                </h3>
                <ul className={"expanded-concert__list"} >
                    {tracksCollected.map((item, index) => {return (
                        <li key={index} className={"expanded-concert__item"}>
                            <Link to={`/track/${item.ID}`}>
                                <h3>
                                    <div className="linked-table">
                                        <span>{item.TRACK_TITLE}</span>
                                        <span>{item.ARTIST_NAME}</span>
                                        <span>{getDurationFromSeconds(item.DURATION)}</span>
                                    </div>
                                </h3>
                            </Link>
                        </li>
                    )})}
                </ul>
            </div>
        </div>
    )
};


const mapStateToProps = state => ({
    appData: state.appData,
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