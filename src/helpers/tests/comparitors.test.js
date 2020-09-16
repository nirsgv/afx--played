import React from 'react';
import {
  withinPeriod,
  hasMatchingText,
  _matchHelper,
  inViewRange,
  _isSearchUnneeded,
} from '../comparitors';
import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new EnzymeAdapter() });

test.skip('evaluate comparitors - functions used for filtering, correctly', () => {
  const tracks = [
    { VAL: 'a', YEAR: 1, GENRES: ['smart', 'nice', 'good'] },
    { VAL: 'b', YEAR: 2, GENRES: ['ugly', 'rotten', 'dogshit'] },
    { VAL: 'c', YEAR: 3, GENRES: ['tomato', 'lettuce', 'cucumber', 'rotten'] },
    { VAL: 'd', YEAR: 101, GENRES: ['car', 'train', 'cab'] },
  ];

  const numArr = [...Array(100).keys()]; // [1, 2, 3, 4, N...]
  expect(numArr.filter(inViewRange(1, 10)).length).toBe(10);
  expect(numArr.filter(inViewRange(5, 8)).length).toBe(40);

  expect(tracks.filter(withinPeriod(numArr)).length).toBe(3);

  expect(_matchHelper({ VAL: 'A' }, 'VAL', 'a')).toBe(true);
  expect(_matchHelper({ VAL: 'A' }, 'VAL', 'ab')).toBe(false);
});

test.skip('search is unneded if "searchString" has a value, or - all supplied "searchFor" values should be false', () => {
  expect(
    _isSearchUnneeded('', {
      searchTrackTitles: false,
      searchArtistNames: false,
      searchAlbumTitles: false,
    })
  ).toBe(true);

  expect(
    _isSearchUnneeded('a', {
      searchTrackTitles: false,
      searchArtistNames: true,
      searchAlbumTitles: true,
    })
  ).toBe(false);

  expect(
    _isSearchUnneeded('a', {
      searchTrackTitles: true,
      searchArtistNames: true,
      searchAlbumTitles: true,
    })
  ).toBe(false);

  expect(
    [{ TRACK_TITLE: 'a' }, { TRACK_TITLE: 'b' }].filter(
      hasMatchingText('a', {
        searchTrackTitles: true,
        searchArtistNames: true,
        searchAlbumTitles: true,
      })
    )
  ).toHaveLength(1);

  expect(
    [{ ARTIST_NAME: 'a' }, { ARTIST_NAME: 'b' }].filter(
      hasMatchingText('abc', {
        searchTrackTitles: true,
        searchArtistNames: true,
        searchAlbumTitles: true,
      })
    )
  ).toHaveLength(0);
});
