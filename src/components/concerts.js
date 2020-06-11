import React from "react";
import concertsData  from "../data/shows";
import List  from "../components/list";
import { Link } from "react-router-dom";
import SvgSprite from "./svgSprite";
import PropTypes from 'prop-types';

const shows = JSON.parse(localStorage.getItem("afx_local_shows")).data;
const getConcertById = (id, concertsData) => {
    return concertsData.find(concert => concert.SHOW_ID === id);
};

function Concerts({ venues }) {
    const concertsCollection = venues.map(item => getConcertById(item, shows));
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