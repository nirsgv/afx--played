// Smoke test: renders every route with the bundled seed data and fails on React errors.
import React from 'react';
import fs from 'node:fs';
import path from 'node:path';
import { act } from '@testing-library/react';

// The seed files contain trailing commas, so parse them as JS object literals.
const readSeed = (file) =>
    new Function(`return ${fs.readFileSync(path.resolve(__dirname, 'data', file), 'utf8')}`)();
const tracks = readSeed('tracks.json');
const shows = readSeed('shows.json');

const routes = {
    home: '/',
    about: '/about',
    track: `/track/${tracks[0].ID}`,
    concert: `/concert/${shows[0].SHOW_ID}`,
};

let consoleError;

beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    const now = Date.now();
    localStorage.setItem('afx_local_tracks', JSON.stringify({ date: now, data: tracks }));
    localStorage.setItem('afx_local_shows', JSON.stringify({ date: now, data: shows }));
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
    vi.stubGlobal('scrollTo', vi.fn());
    consoleError = vi.spyOn(console, 'error');
    vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

test.each(Object.entries(routes))('renders the %s route without React errors', async (name, url) => {
    window.history.pushState({}, '', url);
    const { default: App } = await import('./App');
    const { renderWithStore } = await import('./test-utils');

    let result;
    await act(async () => {
        result = renderWithStore(<App />);
    });

    const app = result.container.querySelector('[data-test="component-app"]');
    expect(app).toBeInTheDocument();
    expect(result.container.querySelector('[data-test="splash-root"]')).not.toBeInTheDocument();
    expect(result.container.querySelector('main')).toBeInTheDocument();
    // React reports problems as messages or Error objects (the app also logs raw data arrays).
    const reactErrors = consoleError.mock.calls.filter(
        ([first]) => typeof first === 'string' || first instanceof Error
    );
    expect(reactErrors).toEqual([]);
});
