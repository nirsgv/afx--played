import React from 'react';
import Checkbox from '../components/checkbox';
import InputBox from "../components/inputBox";
import SvgSprite from "../components/svgSprite";
import { imgData } from "../data/localImgData";
import { Route } from "react-router-dom";
import List from '../components/list'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setSearchValue } from "../actions/index";
import { toggleSearchOption } from '../actions/index';
function Search(props) {
    const {
        toggleSearchOption,
        searchArtistNames,
        searchTrackTitles,
        searchAlbumTitles,
        filteredBySearch,
        setSearchValue
    } = props;

    return (
        <div className='search'>



            <List baseClassName={"checkbox"}>
                <Checkbox checkboxId={"artist-name-active"}
                          labelText={"Artist"}
                          name={"artist-name"}
                          checked={searchArtistNames}
                          onChangeCb={toggleSearchOption}
                />
                <Checkbox checkboxId={"track-title-active"}
                          labelText={"Track"}
                          name={"track-title"}
                          checked={searchTrackTitles}
                          onChangeCb={toggleSearchOption}
                />
                {/*<Checkbox checkboxId={"album-title-active"}*/}
                          {/*labelText={"Album"}*/}
                          {/*name={"album-title"}*/}
                          {/*checked={searchAlbumTitles}*/}
                          {/*onChangeCb={toggleSearchOption}*/}
                {/*/>*/}
            </List>
            <InputBox classname={"main-search"} name="noname" placeholder="Search artist names, track names.." cb={(e) => setSearchValue(e)} value={filteredBySearch}>
                <SvgSprite classes={'main-search__icon'} src={imgData.sprite.src} alt={imgData.sprite.description} name={'SEARCH'} />
            </InputBox>
        </div>
    )
}

const mapStateToProps = state => ({
    searchArtistNames: state.appData.searchArtistNames,
    searchTrackTitles: state.appData.searchTrackTitles,
    searchAlbumTitles: state.appData.searchAlbumTitles,
    filteredBySearch: state.appData.filteredBySearch,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setSearchValue,
    toggleSearchOption
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
