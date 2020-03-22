import React from 'react';
import concertsData  from "../data/showsMap";
import List  from "../components/list";
import { Link } from "react-router-dom";

const getConcertById = (id, concertsData) => {
    return concertsData[id];
};



function Concerts(props) {
    const concertsCollection = props.venues.map(item => getConcertById(item, concertsData));
    return (
            <List baseClassName='concerts'>
                {concertsCollection.map((item, index) => {
                    return (
                        <Link to={`/concert/${item.SHOW_ID}`}>
                            {item.SHOW_TITLE}
                        </Link>
                )})}
            </List>
    )
}

export default Concerts;