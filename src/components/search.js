import React from 'react';
import Checkbox from './checkbox';
import InputBox from "./inputBox";
import { debounce } from "../helpers/higherFunctions";
import SvgSprite from "./svgSprite";
import {imgData} from "../data/localImgData";
import {Route} from "react-router-dom";
import List from './list'

function Search(props) {
    const {
        toggleSearchOption,
        checkboxActivated
    } = props;
    return (
        <div className='search'>

            <List baseClassName={"checkbox"}>
                <Checkbox checkboxId={"artist-name-active"}
                          labelText={"Artist name"}
                          name={"artist-name"}
                          checked={checkboxActivated.searchArtistNames}
                          onChangeCb={toggleSearchOption}
                />
                <Checkbox checkboxId={"track-title-active"}
                          labelText={"Track title"}
                          name={"track-title"}
                          checked={checkboxActivated.searchTrackTitles}
                          onChangeCb={toggleSearchOption}
                />
                <Checkbox checkboxId={"album-title-active"}
                          labelText={"Album title"}
                          name={"album-title"}
                          checked={checkboxActivated.searchAlbumTitles}
                          onChangeCb={toggleSearchOption}
                />
            </List>
            {/*<label htmlFor="artist-name-active">Artist name</label>*/}
            {/*<input type="checkbox"*/}
            {/*       id="artist-name-active"*/}
            {/*       name="artist-name"*/}
            {/*       checked={checkboxActivated.searchArtistNames}*/}
            {/*       onChange={toggleSearchOption} />*/}
            {/*<label htmlFor="track-title-active">Track title</label>*/}
            {/*<input type="checkbox"*/}
            {/*       id="track-title-active"*/}
            {/*       name="track-title"*/}
            {/*       checked={checkboxActivated.searchTrackTitles}*/}
            {/*       onChange={toggleSearchOption} />*/}
            {/*<label htmlFor="album-title-active">Track title</label>*/}
            {/*<input type="checkbox"*/}
            {/*       id="album-title-active"*/}
            {/*       name="album-title"*/}
            {/*       checked={checkboxActivated.searchAlbumTitles}*/}
            {/*       onChange={toggleSearchOption} />*/}
            <InputBox classname={"main-search"} name="noname" placeholder="Search artist names, track names.." cb={(e) => props.setSearchCb(e)} value={props.value}>
                <SvgSprite classes={'main-search__icon'} src={imgData.sprite.src} alt={imgData.sprite.description} name={'SEARCH'} />
            </InputBox>
        </div>
    )
}

export default Search;