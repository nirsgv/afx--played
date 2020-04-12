import React from "react";
import concertsData  from "../data/showsMap";
import List  from "../components/list";
import { Link } from "react-router-dom";
import SvgSprite from "./svgSprite";
import {imgData} from "../data/localImgData";
import PropTypes from 'prop-types';

const getConcertById = (id, concertsData) => {
    return concertsData[id];
};


function Concerts({ venues }) {
    const concertsCollection = venues.map(item => getConcertById(item, concertsData));
    return (
            <List baseClassName='concerts'>
                {concertsCollection.map((item, index) => {
                    return (
                        <Link to={`/concert/${item.SHOW_ID}`} key={index} className={'concerts__link'}>
                            <span className={'concerts__text'}>{item.SHOW_TITLE}</span>
                            <SvgSprite classes={'concerts__icon'} src={imgData.sprite.src} alt={imgData.sprite.description} name={'LONG_ARROW_RIGHT'} />
                        </Link>
                )})}
            </List>
    )
}

Concerts.propTypes = {
    venues: PropTypes.arrayOf(PropTypes.string),
};

export default Concerts;