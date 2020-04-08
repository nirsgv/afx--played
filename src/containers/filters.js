import React from 'react';
import { bindActionCreators } from "redux";
import { expandFilter, filterByTagCb, filterByPeriodCb, setSearchValue, toggleSearchOption } from "../actions/index";
import { connect } from "react-redux";
import Tags from '../components/tags';
import Periods from '../components/periods';
import Search from '../components/search';
import genreMap from '../data/genreMap.js';
import { periodMap } from '../data/periodMap.js';
import { resetFilters } from '../actions/itemFilteringActions'


function Filters ({   appData,
                      filterByTagCb,
                      filterByPeriodCb,
                      setSearchValue,
                      toggleSearchOption,
                      expandedFilter,
                      filteredByTags,
                      filteredByPeriods}) {

        const {
            searchArtistNames,
            searchTrackTitles,
            searchAlbumTitles,
            filteredBySearch
        } = appData;


        const checkboxActivated = {
            searchTrackTitles,
            searchArtistNames,
            searchAlbumTitles
        };

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
                case 'search':
                    return <Search setSearchCb={setSearchValue}
                                   toggleSearchOption={toggleSearchOption}
                                   checkboxActivated={checkboxActivated}
                                   value={filteredBySearch}
                    />;
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
    appData: state.appData,
    expandedFilter: state.appData.expandedFilter,
    filteredByTags: state.appData.filteredByTags,
    filteredByPeriods: state.appData.filteredByPeriods,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    expandFilter,
    filterByTagCb,
    filterByPeriodCb,
    setSearchValue,
    toggleSearchOption,
    resetFilters
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters);