// The home list asks the server for each page; nothing is filtered in the browser.
import React from 'react';
import fs from 'node:fs';
import path from 'node:path';
import { act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import { renderWithStore } from '../test-utils';
import { SET_SEARCH_VALUE } from '../actions';
import Main from './main';

const tracks = new Function(
    `return ${fs.readFileSync(path.resolve(__dirname, '../data/tracks.json'), 'utf8')}`
)();

const searchCalls = () =>
    fetch.mock.calls.map(([url]) => new URL(url, 'http://x')).filter((u) => u.pathname === '/api/tracks/search');

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    localStorage.clear();
    vi.stubGlobal('scrollTo', vi.fn());
    vi.stubGlobal('fetch', vi.fn(async () => ({
        ok: true,
        json: async () => ({ total: 42, skip: 0, limit: 8, items: tracks.slice(0, 8) }),
    })));
});

afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
});

test('loads the first page from the server and searches again when the text changes', async () => {
    const store = createStore(rootReducer);
    const { container } = renderWithStore(<MemoryRouter><Main /></MemoryRouter>, store);

    await waitFor(() => expect(container.querySelector('.filter-index__number')).toHaveTextContent('42'));
    expect(container.querySelectorAll('.track-items > *')).toHaveLength(8);

    expect(searchCalls()).toHaveLength(1);
    const first = searchCalls()[0];
    expect(first.searchParams.get('skip')).toBe('0');
    expect(first.searchParams.get('limit')).toBe('8');
    expect(first.searchParams.get('q')).toBeNull();

    act(() => { store.dispatch({ type: SET_SEARCH_VALUE, payload: 'Aphex' }); });
    await act(async () => { vi.advanceTimersByTime(300); });

    await waitFor(() => expect(searchCalls().some((u) => u.searchParams.get('q') === 'Aphex')).toBe(true));
    expect(searchCalls()).toHaveLength(2); // one request per search, not per keystroke
    const searched = searchCalls().find((u) => u.searchParams.get('q') === 'Aphex');
    expect(searched.searchParams.get('fields')).toBe('artist');
});

test('shows a spinner while the search loads, then hides it', async () => {
    let answer;
    fetch.mockImplementation(() => new Promise((resolve) => { answer = resolve; }));
    const { container } = renderWithStore(<MemoryRouter><Main /></MemoryRouter>);

    await waitFor(() => expect(container.querySelector('[data-test="spinner"]')).toBeInTheDocument());
    expect(container.querySelector('[data-test="spinner"]')).toHaveTextContent('Searching tracks');

    await act(async () => {
        answer({ ok: true, json: async () => ({ total: 8, skip: 0, limit: 8, items: tracks.slice(0, 8) }) });
    });
    await waitFor(() => expect(container.querySelector('[data-test="spinner"]')).not.toBeInTheDocument());
    expect(container.querySelectorAll('.track-items > *')).toHaveLength(8);
});
