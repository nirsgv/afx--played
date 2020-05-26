import React, { useState, useEffect } from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Tags from '../components/tags'
import Periods from '../components/periods'

const Index = (props) => {


    const {
        filteredByTags,
        filteredByPeriods
    } = props;

    return (
        <section className=''>
            <p>Showing result for <Tags tags={filteredByTags}/> <Periods periods={filteredByPeriods}/> </p>
        </section>
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
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);