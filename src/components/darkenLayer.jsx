import React from "react";
import PropTypes from 'prop-types';



function DarkenLayer({ isDesktopFiltersExpanded, isMobileMenuOpen, cb1, cb2 }) {

    return (
            <div className={`darken-layer${isDesktopFiltersExpanded || isMobileMenuOpen ? ' darken-layer--active' : ''}`}
                onClick={() => {cb1(false);cb2(false);}}
            >

            </div>
    )
}

DarkenLayer.propTypes = {
    venues: PropTypes.arrayOf(PropTypes.string),
};

export default DarkenLayer;