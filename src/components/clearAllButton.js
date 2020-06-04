import React from 'react';
import PropTypes from 'prop-types';
import {areFiltersApplied} from "../helpers/comparitors";

function ClearAllButton({ ...restProps }) {

    const { filteredByTags, filteredByPeriods, clickCb } = restProps;

    return (
        <button className={`filter-index__clear-button filter-index__clear-button--${areFiltersApplied(filteredByTags, filteredByPeriods) ? 'active' : 'disabled'}`}
                onClick={areFiltersApplied(filteredByTags, filteredByPeriods) ? clickCb : null}>
            clear (-)
        </button>
    );
}

ClearAllButton.propTypes = {

};

export default ClearAllButton;