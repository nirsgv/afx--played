import React, { useState } from 'react';
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
        searchValue,
        setSearchValue
    } = props;

    const [ isSelected, setIsSelected ] = useState(false);

    const concatPlaceholderText = (a, b) => {
        const ARTIST = 'Artist';
        const TRACK = 'Track';
        let postfix = '';
        if ((a && b) || (!a && !b)) {postfix = `${ARTIST}, ${TRACK}`}
        else if (a) {postfix = ARTIST}
        else {postfix = TRACK}
        return `Search ${postfix} ...`;
    };

    return (
        <div className={`search ${isSelected ? 'search--focus' : 'search--blur'}`}>

            <InputBox classname={"search"}
                      name="noname"
                      placeholder={concatPlaceholderText(searchArtistNames, searchTrackTitles)}
                      cb={(e) => setSearchValue(e)}
                      focusToggleCb ={(val) => setIsSelected(val)}
                      value={searchValue} >

                <SvgSprite classes={'search__icon'}
                           src={imgData.sprite.src}
                           alt={imgData.sprite.description}
                           name={'SEARCH'} />
            </InputBox>

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

            </List>

        </div>
    )
}

const mapStateToProps = state => ({
    searchArtistNames: state.appData.searchArtistNames,
    searchTrackTitles: state.appData.searchTrackTitles,
    searchValue: state.appData.filteredBySearch,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setSearchValue,
    toggleSearchOption
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
