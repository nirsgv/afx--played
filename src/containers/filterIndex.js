import React from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Tags from '../components/tags';
import Decades from '../components/decades';
import { filterByTagCb, filterByPeriodCb } from '../actions';
import { resetFilters } from '../actions/itemFilteringActions'

const FilterIndex = (props) => {

    const {
        filteredByTags,
        filteredByPeriods,
        itemsCount,
        filterByTagCb,
        filterByPeriodCb,
        resetFilters
    } = props;

    return (
        <nav className='filter-index'>
            <aside className='filter-index__paragraph'>
                
                <div className="filter-index__info-wrap">
                    <span className='filter-index__results'>Showing</span>
                    <span className='filter-index__number'>{itemsCount}</span>
                    <span className='filter-index__results'>results.</span>
                    <span className='filter-index__filters'>{(filteredByTags.length || filteredByPeriods.length) ? 'Filters applied:' : ''}</span>
                    <Tags tags={filteredByTags} tagCb={(tag) => filterByTagCb(tag)} />
                    <Decades periods={filteredByPeriods} periodCb={(period) => filterByPeriodCb(period)}/>
                </div>

                <div className="filter-index__cta-wrap">
                    <button onClick={resetFilters} className='filter-index__clear-button' href={'#'}>clear (-)</button>
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
    filteredByPeriods: state.appData.filteredByPeriods
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