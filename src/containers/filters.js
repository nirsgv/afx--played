import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { expandFilter, filterByTagCb, filterByPeriodCb } from "../actions/index";
import { resetFilters } from '../actions/itemFilteringActions'
import { periodMap } from '../data/periodMap.js';
import Tags from '../components/tags';
import Decades from '../components/decades';
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
                                 tagCb={filterByTagCb}
                                 activeTags={filteredByTags}/>;
                case 'years':
                    return <Decades periods={Object.keys(periodMap)}
                                    periodCb={filterByPeriodCb}
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