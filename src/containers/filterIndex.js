import React from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Tags from '../components/tags';
import Decades from '../components/decades';
import { filterByTagCb, filterByPeriodCb } from '../actions';
import { resetFilters } from '../actions/itemFilteringActions'
import { areFiltersApplied } from '../helpers/comparitors'
import ClearAllButton from "../components/clearAllButton";

const FilterIndex = (props) => {

    const {
        filteredByTags,
        filteredByPeriods,
        itemsCount = 0,
        filterByTagCb,
        filterByPeriodCb,
        resetFilters,
        filteredBySearch
    } = props;

    return (
        <nav className='filter-index'>
            <aside className='filter-index__paragraph'>

                <div className="filter-index__info-wrap">
                    <span className='filter-index__results'>Showing</span>
                    <span className='filter-index__number'>{itemsCount}</span>
                    <span className='filter-index__results'>results.</span>
                    <span className='filter-index__filters'>{areFiltersApplied(filteredByTags, filteredByPeriods, filteredBySearch) ? 'Filters applied:' : ''}</span>
                    <Tags tags={filteredByTags} tagCb={(tag) => filterByTagCb(tag)} />
                    <Decades periods={filteredByPeriods} periodCb={(period) => filterByPeriodCb(period)}/>
                </div>

                <div className="filter-index__cta-wrap">
                    <ClearAllButton filteredByTags={filteredByTags}
                                    filteredByPeriods={filteredByPeriods}
                                    clickCb={resetFilters}
                                    filteredBySearch={filteredBySearch}/>
                </div>

            </aside>
        </nav>
    );

};

FilterIndex.defaultProps = {

};

FilterIndex.propTypes = {

};


const mapStateToProps = state => ({
    filteredByTags: state.appData.filteredByTags,
    filteredByPeriods: state.appData.filteredByPeriods,
    filteredBySearch: state.appData.filteredBySearch
});

const mapDispatchToProps = dispatch => bindActionCreators({
    filterByTagCb,
    filterByPeriodCb,
    resetFilters
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterIndex);