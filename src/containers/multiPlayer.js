import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SvgSprite from "../components/svgSprite";
import {imgData} from "../data/localImgData";

function MultiPlayer({ sampleId }) {

    return (
        <section className='player__wrap'>
            {sampleId}
        </section>
    )
};

const mapStateToProps = state => ({
    sampleId: state.appData.sampleId,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MultiPlayer);