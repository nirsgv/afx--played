import React from 'react';
import genreMap from '../data/genreMap.js';
import { evaluateKey } from '../helpers/str';



function Tags(props) {
    const {
        tags,
        filterByTagCb,
        activeTags
    } = props;
    return (
        <ul className='tags'>
            {tags && tags.map((tag, index) => {
                return (
                    <li className={`tags__item${activeTags && !activeTags.includes(tag) ? '' : ' tags__item--active'}`}
                        key={index}
                        onClick={filterByTagCb ? () => {filterByTagCb(tag)} : undefined}
                    >
                        {evaluateKey(genreMap, tag)}
                    </li>
                )
            })}
        </ul>
    )
}

export default Tags;