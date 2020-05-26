import React from 'react';
import genreMap from '../data/genreMap.js';
import { evaluateKey } from '../helpers/str';
import PropTypes from "prop-types";
import SwitchButton from "./switchButton";



function Tags({ tags, filterByTagCb, activeTags }) {

    return (
        <ul className='tags'>
            {tags && tags.map((tag, index) => {
                return (
                    <li className={`tags__item${activeTags && !activeTags.includes(tag) ? '' : ' tags__item--active'}`}
                        key={index}
                        onClick={filterByTagCb ? () => {filterByTagCb(tag)} : null}
                    >
                        {evaluateKey(genreMap, tag)}
                    </li>
                )
            })}
        </ul>
    )
}

SwitchButton.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
    filterByTagCb: PropTypes.func,
    activeTags: PropTypes.arrayOf(PropTypes.string)
};

export default Tags;