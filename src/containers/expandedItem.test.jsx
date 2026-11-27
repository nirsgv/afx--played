// The track page loads its track from the API, so tracks added after the
// browser cached the full list still open (this used to crash).
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderWithStore } from '../test-utils';
import ExpandedItem from './expandedItem';

const newTrack = {
    ARTIST_NAME: 'The Tuss',
    TRACK_TITLE: 'Synthacon 9',
    ALBUM_TITLE: 'Rushup Edge',
    RECORD_LABEL: 'Self-released', // no CAT, no DURATION
    YEAR: 2007,
    GENRES: ['#TEC'],
    LINKS: { YOUTUBE: 'https://youtu.be/FQbt7MV-bX8' },
    VENUES: ['2Sep2023'],
    ID: 'thetuss+synthacon9',
    ALBUM_ID: 'thetuss+rushupedge',
};
const show = { SHOW_ID: '2Sep2023', SHOW_TITLE: 'Forwards Festival, Clifton Down, Bristol, England' };

const respond = (routes) => vi.fn(async (url) => {
    const body = routes[url];
    return { ok: true, status: 200, json: async () => body ?? [] };
});

const renderAt = (url) => renderWithStore(
    <MemoryRouter initialEntries={[url]}>
        <Route path="/track/:id" component={ExpandedItem} />
    </MemoryRouter>
);

beforeEach(() => {
    localStorage.clear(); // nothing cached: the page must not depend on it
    vi.stubGlobal('scrollTo', vi.fn());
});
afterEach(() => vi.unstubAllGlobals());

test('loads a track that is not in the cached list, without "undefined" for missing fields', async () => {
    vi.stubGlobal('fetch', respond({
        '/api/track/thetuss%2Bsynthacon9': [newTrack],
        '/api/show/2Sep2023': [show],
    }));
    const { container } = renderAt('/track/thetuss%2Bsynthacon9');

    await waitFor(() => expect(screen.getByText('The Tuss')).toBeInTheDocument());
    expect(screen.getByText('Synthacon 9')).toBeInTheDocument();
    expect(screen.getByText('Rushup Edge (2007)')).toBeInTheDocument();
    expect(screen.getByText('Self-released')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(show.SHOW_TITLE)).toBeInTheDocument());
    expect(container.textContent).not.toContain('undefined');
});

test('shows "Track not found" for an unknown id', async () => {
    vi.stubGlobal('fetch', respond({}));
    renderAt('/track/nope');
    await waitFor(() => expect(screen.getByText('Track not found.')).toBeInTheDocument());
});
