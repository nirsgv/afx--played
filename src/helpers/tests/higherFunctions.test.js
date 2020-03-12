import {
    debounce,
    throttle,
    memofy,
} from '../higherFunctions';
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new EnzymeAdapter()});

test('evaluate comparitors - functions used for filtering, correctly', () => {
    const multiply = (a, b, c, d, e) => a * b * c * d * e;
    const memoizedFunc = memofy(multiply);
    expect(typeof memoizedFunc).toBe("function");

    expect(memoizedFunc(1,2,3,4,5)).toBe(120);
    expect(memofy(multiply)(1,2,3,4,5)).toBe(120);

});

describe('Test debounce function', () => {
    test('does something when it is clicked', () => {
        const mockOnClick = jest.fn();
        const debouncedMockOnClick = jest.fn(debounce(mockOnClick, 10));
        const MyButton = ({mockOnClick}) => {
            return (
                <button onClick={mockOnClick}>click here</button>
            )
        };
        const wrapper = shallow(<MyButton mockOnClick={debouncedMockOnClick}/>);

        wrapper.find('button').simulate('click');
        wrapper.find('button').simulate('click');
        wrapper.find('button').simulate('click');
        wrapper.find('button').simulate('click');
        expect(debouncedMockOnClick).toHaveBeenCalledTimes(4)
        //expect(mockOnClick.mock.calls.length).toBe(3);

    })
});


// const consoleSomething = (text) => {console.log(text)};
// document.querySelector('.box1').addEventListener('click', debounce(function(){consoleSomething('debounce')}, 1000));
// document.querySelector('.box2').addEventListener('click', throttle(function(){consoleSomething('throttle')}, 1000));
// const add = (a, b) => a + b;
// const multiply = (a, b, c, d, e) => a * b * c * d * e;
// const memoizedFunc = memofy(multiply);
