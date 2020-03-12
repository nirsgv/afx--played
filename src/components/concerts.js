import React from 'react';
import concertsData  from "../data/showsMap";
import { Link } from "react-router-dom";

const getConcertById = (id, concertsData) => {
    return concertsData[id];
};



function Concerts(props) {
    const concertsCollection = props.venues.map(item => getConcertById(item, concertsData));
    return (
        <nav className='concerts__wrap'>
            <ul className='concerts__list'>
                {concertsCollection.map((item, index) => {
                    return (
                        <li key={index} className="concerts__item">
                            <Link to={`/concert/${item.SHOW_ID}`}>
                                {item.SHOW_TITLE}
                            </Link>
                        </li>
                )})}
            </ul>
        </nav>
    )
}

export default Concerts;