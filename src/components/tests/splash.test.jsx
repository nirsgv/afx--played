import React from 'react';
import Splash, { atLeastOneIsFalse } from '../../containers/splash';
import { renderWithStore } from '../../test-utils';

test('atLeastOneIsFalse', () => {
    expect(atLeastOneIsFalse(false, false)).toBe(true);
    expect(atLeastOneIsFalse(true, false)).toBe(true);
    expect(atLeastOneIsFalse(true, true)).toBe(false);
});

test('shows the splash screen while data is not local yet', () => {
    const { container } = renderWithStore(<Splash />);
    expect(container.querySelector('[data-test="splash-root"]')).toBeInTheDocument();
});
