import {
    debounce,
    throttle,
    memofy,
} from '../higherFunctions';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

test('evaluate comparitors - functions used for filtering, correctly', () => {
    const multiply = (a, b, c, d, e) => a * b * c * d * e;
    const memoizedFunc = memofy(multiply);
    expect(typeof memoizedFunc).toBe("function");

    expect(memoizedFunc(1,2,3,4,5)).toBe(120);
    expect(memofy(multiply)(1,2,3,4,5)).toBe(120);

});

describe('Test debounce function', () => {
    test('does something when it is clicked', () => {
        const mockOnClick = vi.fn();
        const debouncedMockOnClick = vi.fn(debounce(mockOnClick, 10));
        const MyButton = ({mockOnClick}) => {
            return (
                <button onClick={mockOnClick}>click here</button>
            )
        };
        render(<MyButton mockOnClick={debouncedMockOnClick}/>);

        const button = screen.getByRole('button');
        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);
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
