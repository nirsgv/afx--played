import { buildTrackSearch, MAX_LIMIT } from '../trackSearch';

test('no parameters: match everything, first page of 8', () => {
    expect(buildTrackSearch()).toEqual({ filter: {}, skip: 0, limit: 8 });
});

test('text search is a case-insensitive substring on the chosen fields', () => {
    const { filter } = buildTrackSearch({ q: ' Aphex ', fields: 'artist,track' });
    expect(filter.$or).toHaveLength(2);
    const [artist, track] = filter.$or;
    expect(artist.ARTIST_NAME.test('APHEX TWIN')).toBe(true);
    expect(track.TRACK_TITLE.test('Polygon Window')).toBe(false);
});

test('text is ignored when no field is chosen or it is blank', () => {
    expect(buildTrackSearch({ q: 'aphex' }).filter).toEqual({});
    expect(buildTrackSearch({ q: '   ', fields: 'artist' }).filter).toEqual({});
    expect(buildTrackSearch({ q: 'aphex', fields: 'bogus' }).filter).toEqual({});
});

test('regex characters in the text are matched literally', () => {
    const { filter } = buildTrackSearch({ q: 'a.c (x)', fields: 'track' });
    const pattern = filter.$or[0].TRACK_TITLE;
    expect(pattern.test('a.c (x) mix')).toBe(true);
    expect(pattern.test('abc x')).toBe(false);
});

test('genres and years become $in filters', () => {
    const { filter } = buildTrackSearch({ genres: '#AMB,#ACI', years: '1991,1992,x,1991' });
    expect(filter.GENRES).toEqual({ $in: ['#AMB', '#ACI'] });
    expect(filter.YEAR).toEqual({ $in: [1991, 1992] });
});

test('array values (Express repeated params) work like comma lists', () => {
    expect(buildTrackSearch({ genres: ['#AMB', '#ACI'] }).filter.GENRES).toEqual({ $in: ['#AMB', '#ACI'] });
});

test('paging is clamped', () => {
    expect(buildTrackSearch({ skip: '-5', limit: '0' })).toMatchObject({ skip: 0, limit: 1 });
    expect(buildTrackSearch({ skip: '16', limit: '9999' })).toMatchObject({ skip: 16, limit: MAX_LIMIT });
    expect(buildTrackSearch({ skip: 'abc', limit: 'abc' })).toMatchObject({ skip: 0, limit: 8 });
});
