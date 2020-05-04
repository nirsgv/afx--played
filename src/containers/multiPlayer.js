import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function MultiPlayer({ sampleId }) {

    return (
        <section className='player__wrap'>
            {sampleId}
        </section>
    )
};

const mapStateToProps = state => ({
    sampleId: state.player.sampleId,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MultiPlayer);