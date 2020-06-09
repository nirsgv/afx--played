import React, { useState } from 'react'
import PropTypes from 'prop-types';
import {
    expandFilter, resetFilters, setSearchValue,
    toggleDesktopFilters, toggleMobMenu, toggleSearchOption,
} from "../actions/index";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { NavLink } from "react-router-dom";
import SvgSprite from '../components/svgSprite';
import List from '../components/list';
import AnimativeIndicator from '../components/animativeIndicator';


const Footer = (props) => {

    const [ animateFooter, setAnimateFooter ] = useState(false);

    const {
        toggleMobMenu,
    } = props;

    return (
        <footer className={"footer"} >
            <nav>
                <List baseClassName="footer-nav" onClick={toggleMobMenu}>
                    <SvgSprite classes={''} name={'APHEX'} />
                    <NavLink exact={true} activeClassName="active" to="/">Home</NavLink>
                    <NavLink activeClassName="active" to="/editorial">Editorial</NavLink>
                    <NavLink activeClassName="active" to="/about">About</NavLink>
                    {/*<AnimativeIndicator animateFooter={animateFooter} setAnimateFooter={setAnimateFooter} />*/}
                </List>
            </nav>
        </footer>
    );

};

Footer.defaultProps = {

};

Footer.propTypes = {

};


const mapStateToProps = state => ({
    isMobileMenuOpen: state.appData.isMobileMenuOpen,
    expandedFilter: state.appData.expandedFilter,
    isDesktopFiltersExpanded: state.appData.isDesktopFiltersExpanded,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setSearchValue,
    toggleSearchOption,
    expandFilter,
    toggleMobMenu,
    toggleDesktopFilters,
    resetFilters
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);