import React from "react";
import List  from "../components/list";
import { Link } from "react-router-dom";
import SvgSprite from "./svgSprite";
import PropTypes from 'prop-types';

const shows = JSON.parse(localStorage.getItem("afx_local_shows")),
      showsData = shows ? shows.data : false,
      getConcertById = (id, concertsData) => {
    return concertsData.find(concert => concert.SHOW_ID === id);
};

function Concerts({ venues }) {
    const concertsCollection = shows && venues.map(item => getConcertById(item, showsData));
    console.error(concertsCollection);
    {return concertsCollection.filter(item => !!item).length ?
     (
            <List baseClassName='concerts'>
                {concertsCollection.map((item, index, items) => (
                        <Link to={`/concert/${item && encodeURIComponent(item.SHOW_ID)}`} key={index} className={'concerts__link'}>
                            <span className={'concerts__text'}>{item && item.SHOW_TITLE}</span>
                            <SvgSprite classes={'concerts__icon'} name={'LONG_ARROW_RIGHT'} />
                        </Link>
                ))}
            </List>
    ) : <h3 className={'expanded-item__none'}>None specified.</h3>}
}

Concerts.propTypes = {
    venues: PropTypes.arrayOf(PropTypes.string),
};

export default Concerts;