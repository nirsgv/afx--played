import { areFiltersApplied } from '../comparitors';

test('areFiltersApplied is truthy when any tag, period or search text is set', () => {
    expect(areFiltersApplied([], [], '')).toBeFalsy();
    expect(areFiltersApplied(['#AMB'], [], '')).toBeTruthy();
    expect(areFiltersApplied([], ['#90a'], '')).toBeTruthy();
    expect(areFiltersApplied([], [], 'aphex')).toBeTruthy();
});
