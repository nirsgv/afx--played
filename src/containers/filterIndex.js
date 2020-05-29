import React from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Tags from '../components/tags'
import Decades from '../components/decades'
import { filterByTagCb, filterByPeriodCb } from '../actions'
const FilterIndex = (props) => {


    const {
        filteredByTags,
        filteredByPeriods,
        itemsCount,
        filterByTagCb,
        filterByPeriodCb
    } = props;

    return (
        <nav className='filter-index'>
            <aside className='filter-index__paragraph'>
                <span className='filter-index__results'>Showing</span>
                <span className='filter-index__number'>{itemsCount}</span>
                <span className='filter-index__results'>results.</span>
                <span className='filter-index__filters'>{(filteredByTags.length || filteredByPeriods.length) ? 'Filters applied:' : ''}</span>
                <Tags tags={filteredByTags} tagCb={(tag) => filterByTagCb(tag)} />
                <Decades periods={filteredByPeriods} periodCb={(period) => filterByPeriodCb(period)}/>
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
    filterByPeriodCb
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterIndex);