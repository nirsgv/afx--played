import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from '../components/checkbox';
import InputBox from '../components/inputBox';
import SvgSprite from '../components/svgSprite';
import { imgData } from '../data/localImgData';
import List from '../components/list';
import { setSearchValue } from '../actions/index';
import { toggleSearchOption } from '../actions/index';

function Search(props) {
  const {
    toggleSearchOption,
    searchArtistNames,
    searchTrackTitles,
    searchValue,
    setSearchValue,
  } = props;

  const [isSelected, setIsSelected] = useState(false);

  const setPlaceholderText = (a, b) => {
    const ARTIST = 'Artist';
    const TRACK = 'Track';
    let postfix = '';
    if ((a && b) || (!a && !b)) {
      postfix = `${ARTIST}, ${TRACK}`;
    } else if (a) {
      postfix = ARTIST;
    } else {
      postfix = TRACK;
    }
    return `Search ${postfix} ...`;
  };

  return (
    <div className={`search ${isSelected ? 'search--focus' : 'search--blur'}`}>
      <InputBox
        classname={'search'}
        name='noname'
        placeholder={setPlaceholderText(searchArtistNames, searchTrackTitles)}
        cb={(e) => setSearchValue(e)}
        focusToggleCb={(val) => setIsSelected(val)}
        value={searchValue}
      >
        <SvgSprite className={'search__icon'} name={'SEARCH'} />
      </InputBox>

      <List baseClassName={'checkbox'}>
        <Checkbox
          checkboxId={'artist-name-active'}
          labelText={'Artist'}
          name={'artist-name'}
          checked={searchArtistNames}
          onChangeCb={toggleSearchOption}
        />

        <Checkbox
          checkboxId={'track-title-active'}
          labelText={'Track'}
          name={'track-title'}
          checked={searchTrackTitles}
          onChangeCb={toggleSearchOption}
        />
      </List>
    </div>
  );
}

const mapStateToProps = (state) => ({
  searchArtistNames: state.appData.searchArtistNames,
  searchTrackTitles: state.appData.searchTrackTitles,
  searchValue: state.appData.filteredBySearch,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSearchValue,
      toggleSearchOption,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Search);
