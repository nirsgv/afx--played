import ReactDOM from "react-dom";
import App from "../../App";
import React from 'react';

import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new EnzymeAdapter()});

import {
    evaluateKey,
    getDurationFromSeconds,
    combineByObjKeysArr,
    getMonthFromShort
} from '../str';


test('evaluate string helpers correctly', () => {
    expect(evaluateKey({a : 1}, 'a')).toEqual(1);

    expect(getDurationFromSeconds(undefined)).toBe("0:00");
    expect(getDurationFromSeconds(60)).toBe("1:00");
    expect(getDurationFromSeconds(1000)).toBe("16:40");

    expect(getMonthFromShort('Jan')).toBe('January');
    expect(getMonthFromShort('juL')).toBe('July');
    expect(getMonthFromShort()).toBe('January');

    expect(combineByObjKeysArr(['a','b'],{
        'a': [1, 2, 3],
        'b': [4, 5, 6]
    })).toEqual([1, 2, 3, 4, 5, 6]);

    expect(combineByObjKeysArr(['#60a','#60z'],{
        '#60a': [1960, 1961, 1962, 1963, 1964],
        '#60z': 1,
        '#70a': [1970, 1971, 1972, 1973, 1974],
    })).toEqual([1960, 1961, 1962, 1963, 1964, 1]);
});

