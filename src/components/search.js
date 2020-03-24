import React from 'react';
import Checkbox from './checkbox';
import InputBox from "./inputBox";
import { debounce } from "../helpers/higherFunctions";

function Search(props) {
    const {
        toggleSearchOption,
        checkboxActivated
    } = props;
    return (
        <div className='search'>

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
            <InputBox name="noname" placeholder="Search.." cb={(e) => props.setSearchCb(e)} value={props.value}/>
        </div>
    )
}

export default Search;