import React from 'react';
import { periodMap, yearsMap } from '../data/periodMap.js';
import { evaluateKey } from '../helpers/str';
import PropTypes from 'prop-types';



function Periods(props) {
    const {
        periods,
        filterByPeriodCb,
        activePeriods
    } = props;
    return (
        <ul className='tags filter-expansion__list'>
            {periods && periods.reverse().map((period, index) => {
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

Periods.defaultProps = {
};

Periods.propTypes = {
    periods: PropTypes.array,
    filterByPeriodCb: PropTypes.func,
    activePeriods: PropTypes.array,
};

export default Periods;