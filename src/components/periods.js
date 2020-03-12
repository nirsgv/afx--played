import React from 'react';
import { periodMap, yearsMap } from '../data/periodMap.js';
import { evaluateKey } from '../helpers/str';



function Periods(props) {
    const {
        periods,
        filterByPeriodCb,
        activePeriods
    } = props;
    return (
        <ul className='tags filter-expansion__list'>
            {periods && periods.map((period, index) => {
                return (
                    <li className={`tags__item  tags__item--${activePeriods && !activePeriods.includes(period) ? 'in' : ''}active`}
                        key={index}
                        onClick={filterByPeriodCb ? () => {filterByPeriodCb(period)} : undefined}
                    >
                        {evaluateKey(periodMap, period)}
                    </li>
                )
            })}
        </ul>
    )
}

export default Periods;