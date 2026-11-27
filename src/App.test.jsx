import React from 'react';
import App from './App';
import { renderWithStore } from './test-utils';

beforeEach(() => {
    localStorage.clear();
    // Keep the data requests pending so the app stays on the splash screen.
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
});

afterEach(() => {
    vi.unstubAllGlobals();
});

it('renders the app shell and the splash screen while data loads', () => {
    const { container } = renderWithStore(<App />);

    expect(container.querySelector('[data-test="component-app"]')).toBeInTheDocument();
    expect(container.querySelector('[data-test="splash-root"]')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(window.location.origin + '/api/tracks');
    expect(fetch).toHaveBeenCalledWith(window.location.origin + '/api/shows');
});
