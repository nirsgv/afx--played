import React from 'react';
import Checkbox from './checkbox';

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
            <input type="text" name="noname" placeholder="Search.." onInput={(e) => props.setSearchCb(e)}/>
        </div>
    )
}

export default Search;