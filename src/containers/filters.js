import React from 'react';
import { bindActionCreators } from "redux";
import { expandFilter, filterByTagCb, filterByPeriodCb, setSearchValue, toggleSearchOption } from "../actions/index";
import { connect } from "react-redux";
import Tags from '../components/tags';
import Periods from '../components/periods';
import Search from '../components/search';
import genreMap from '../data/genreMap.js';
import { periodMap, yearsMap } from '../data/periodMap.js';


const filterBy = [
  'genres',
  'years',
  'search',
];

class Filters extends React.Component {
    render(props) {
        const { expandedFilter,
            filteredByTags,
            filteredByPeriods,
            searchArtistNames,
            searchTrackTitles,
            searchAlbumTitles
        } = this.props.appData;

        const checkboxActivated = {
            searchTrackTitles,
            searchArtistNames,
            searchAlbumTitles
        };

        const renderFilter = (filter) => {
            switch(filter) {
                case 'genres':
                    return <Tags tags={Object.keys(genreMap)}
                                 filterByTagCb={this.props.filterByTagCb}
                                 activeTags={filteredByTags}/>;
                case 'years':
                    return <Periods periods={Object.keys(periodMap)}
                                    filterByPeriodCb={this.props.filterByPeriodCb}
                                    activePeriods={filteredByPeriods}/>;
                case 'search':
                    return <Search setSearchCb={this.props.setSearchValue}
                                   toggleSearchOption={this.props.toggleSearchOption}
                                   checkboxActivated={checkboxActivated} />;
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
}


const mapStateToProps = state => ({
    appData: state.appData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    expandFilter,
    filterByTagCb,
    filterByPeriodCb,
    setSearchValue,
    toggleSearchOption
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters);