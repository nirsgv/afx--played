import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from '../components/checkbox';
import InputBox from '../components/inputBox';
import SvgSprite from '../components/svgSprite';
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

  const [isFocused, setIsFocused] = useState(false);
  const [preSearchText, setPreSearchText] = useState('');

  const setInner = (e) => {
    setPreSearchText(e.target.value);
  };
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
    <div className={`search ${isFocused ? 'search--focus' : 'search--blur'}`}>
      <InputBox
        classname={'search'}
        name='noname'
        placeholder={setPlaceholderText(searchArtistNames, searchTrackTitles)}
        cb={setInner}
        focusToggleCb={(val) => setIsFocused(val)}
        value={preSearchText}
        onKeyPress={(event) =>
          event.key === 'Enter' && setSearchValue(preSearchText)
        }
      >
        <SvgSprite className={'search__icon'} name={'SEARCH'} />
      </InputBox>

      {isFocused || preSearchText ? (
        <button onClick={() => setSearchValue(preSearchText)}>Search!</button>
      ) : (
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
      )}
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
