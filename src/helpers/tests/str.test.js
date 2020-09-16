import ReactDOM from 'react-dom';
import React from 'react';
import App from '../../App';

import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

import {
  evaluateKey,
  getDurationFromSeconds,
  gatherObjValuesFromKeysArr,
  copyToClipboard,
  getMonthFromShort,
  expClass,
  getLeftToComma,
} from '../str';

/* evaluateKey */
test('"evaluateKey" to be a function', () => {
  expect(typeof evaluateKey).toEqual('function');
});

test('"evaluateKey" returns value of key from given object', () => {
  expect(evaluateKey({ a: 1 }, 'a')).toEqual(1);
  expect(evaluateKey({ b: 2, c: 3, d: 4 }, 'b')).toEqual(2);
  expect(evaluateKey({ b: 2, c: 3, d: 4 }, 'a')).toEqual(undefined);
});

/* getDurationFromSeconds */
test('"getDurationFromSeconds" to be a function', () => {
  expect(typeof getDurationFromSeconds).toEqual('function');
});

test('"getDurationFromSeconds" returns value of key from given object', () => {
  expect(typeof getDurationFromSeconds(1)).toBe('string');
  expect(getDurationFromSeconds(1)).toBe('0:01');
  expect(getDurationFromSeconds(120)).toBe('2:00');
});

test('"getDurationFromSeconds" returns an equal string if given one as argument', () => {
  expect(typeof getDurationFromSeconds('1')).toBe('string');
  expect(getDurationFromSeconds('1')).toBe('1');
});

/* gatherObjValuesFromKeysArr */
test('"gatherObjValuesFromKeysArr" to be a function', () => {
  expect(typeof gatherObjValuesFromKeysArr).toEqual('function');
});

test('"gatherObjValuesFromKeysArr" returns object correctly values mapped to given keys array', () => {
  const object = { a: 1, b: 2, c: 3, d: 4 };
  expect(
    Array.isArray(gatherObjValuesFromKeysArr(['a', 'b', 'c'], object))
  ).toEqual(true);
  expect(gatherObjValuesFromKeysArr(['a', 'b', 'c'], object)).toEqual([
    1,
    2,
    3,
  ]);
});

/* getMonthFromShort */
test('"getMonthFromShort" to be a function', () => {
  expect(typeof getMonthFromShort).toEqual('function');
});

test('"getMonthFromShort" returns a string, full version of given shorthand', () => {
  expect(typeof getMonthFromShort('jan')).toBe('string');
  expect(getMonthFromShort('jan')).toBe('January');
  expect(getMonthFromShort('Sep')).toBe('September');
});

/* expClass */
test('"expClass" to be a function', () => {
  expect(typeof expClass).toEqual('function');
});

test('"expClass" returns "--on" if both params are equal', () => {
  expect(typeof expClass('a', 'a')).toBe('string');
  expect(expClass('a', 'a')).toBe('--on');
});

/* getLeftToComma */
test('"getLeftToComma" to be a function', () => {
  expect(typeof getLeftToComma).toEqual('function');
});

test('"getLeftToComma" returns string part prior to "," ', () => {
  expect(getLeftToComma('abc,def')).toEqual('abc');
});
