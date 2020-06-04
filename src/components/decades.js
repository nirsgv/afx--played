import React from 'react';
import { periodMap } from '../data/periodMap.js';
import { evaluateKey } from '../helpers/str';
import PropTypes from 'prop-types';


function Decades(props) {
    const {
        periods,
        periodCb,
        activePeriods
    } = props;
    return (
        <ul className='tags tags--decades'>
            {periods && periods.reverse().map((period, index) => {
                return (
                    <li className={`tags__item  tags__item--${activePeriods && !activePeriods.includes(period) ? 'in' : ''}active`}
                        key={index}
                        onClick={periodCb ? () => {periodCb(period)} : undefined}
                    >
                        {evaluateKey(periodMap, period)}
                    </li>
                )
            })}
        </ul>
    )
}

Decades.defaultProps = {
};

Decades.propTypes = {
    periods: PropTypes.array,
    filterByPeriodCb: PropTypes.func,
    activePeriods: PropTypes.array,
};

export default Decades;