import React from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Tags from '../components/tags'
import Decades from '../components/decades'
import { filterByTagCb, filterByPeriodCb } from '../actions'
const Index = (props) => {


    const {
        filteredByTags,
        filteredByPeriods,
        itemsCount,
        filterByTagCb,
        filterByPeriodCb
    } = props;

    return (
        <nav className='filter-index'>
            <p className='filter-index__par'>Showing {itemsCount} result for:
                <Tags tags={filteredByTags} tagCb={(tag) => filterByTagCb(tag)} />
                <Decades periods={filteredByPeriods} periodCb={(period) => filterByPeriodCb(period)}/>
            </p>
        </nav>
    );

};

Index.defaultProps = {

};

Index.propTypes = {

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
)(Index);