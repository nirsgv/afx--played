import React from 'react';
import { bindActionCreators } from "redux";
import { expandFilter, filterByTagCb, filterByPeriodCb } from "../actions/index";
import { resetFilters } from '../actions/itemFilteringActions'
import { connect } from "react-redux";
import { periodMap } from '../data/periodMap.js';
import Tags from '../components/tags';
import Periods from '../components/periods';
import genreMap from '../data/genreMap.js';


function Filters ({   filterByTagCb,
                      filterByPeriodCb,
                      expandedFilter,
                      filteredByTags,
                      filteredByPeriods,
}) {



        const renderFilter = (filter) => {
            switch(filter) {
                case 'genres':
                    return <Tags tags={Object.keys(genreMap)}
                                 filterByTagCb={filterByTagCb}
                                 activeTags={filteredByTags}/>;
                case 'years':
                    return <Periods periods={Object.keys(periodMap)}
                                    filterByPeriodCb={filterByPeriodCb}
                                    activePeriods={filteredByPeriods}/>;

                default:
                    return <h1></h1>;
            }
        };

        return (
            <>
                {renderFilter(expandedFilter)}
            </>
        )
}


const mapStateToProps = state => ({
    expandedFilter: state.appData.expandedFilter,
    filteredByTags: state.appData.filteredByTags,
    filteredByPeriods: state.appData.filteredByPeriods,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    expandFilter,
    filterByTagCb,
    filterByPeriodCb,
    resetFilters
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters);