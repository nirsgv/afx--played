import React, { useEffect, useMemo, useRef, useState } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Items from '../components/items';
import { combineByObjKeysArr } from '../helpers/str';
import { scrollTop } from '../helpers/dom';
import { checkIntroNecessity } from '../helpers/localStorage';
import { searchTracks } from '../helpers/api';
import { useDebouncedValue } from '../customHooks';
import { yearsMap } from '../data/periodMap.js';
import { dispatchMessageToModal, toggleShareExpansion, setPlayerItem, setSpaPageName,
         resetBatch, filterByTagCb, cancelWelcomeIntro } from "../actions";
import FilterIndex from './filterIndex';
import WelcomeMessage from '../components/welcomeMessage';
import Spinner from '../components/spinner';

const SEARCH_DEBOUNCE_MS = 250;
const emptyResult = { key: null, total: 0, items: [], error: null };

const Main = ({ filteredByTags,
                filteredByPeriods,
                filteredBySearch,
                searchArtistNames,
                searchTrackTitles,
                searchAlbumTitles,
                itemsBatchAmt,
                batchNum,
                setSpaPageName,
                setPlayerItem,
                resetBatch,
                shouldPresentWelcomeIntro,
                cancelWelcomeIntro
              }) => {

    useEffect(() => {
        setSpaPageName && setSpaPageName('home');
        checkIntroNecessity('afx-local_intro', cancelWelcomeIntro);
        resetBatch();
        scrollTop();
    }, [ filteredByTags, filteredByPeriods ]);

    const [ entranceClassName, setEntranceClassName ] = useState('faded-in-from-bottom');

    // Everything the server needs to answer the search. `queryKey` identifies it.
    const q = useDebouncedValue(filteredBySearch.trim(), SEARCH_DEBOUNCE_MS);
    const query = useMemo(() => ({
        q,
        fields: [
            searchArtistNames && 'artist',
            searchTrackTitles && 'track',
            searchAlbumTitles && 'album',
        ].filter(Boolean),
        genres: filteredByTags,
        years: combineByObjKeysArr(filteredByPeriods, yearsMap),
    }), [q, searchArtistNames, searchTrackTitles, searchAlbumTitles, filteredByTags, filteredByPeriods]);
    const queryKey = JSON.stringify(query);

    // A new search starts again from the first page.
    useEffect(() => { resetBatch(); }, [queryKey]);

    const [ result, setResult ] = useState(emptyResult);
    // 'search' while a new search loads, 'more' while the next page loads, else null.
    const [ loading, setLoading ] = useState(null);
    const pending = useRef(null);

    // Fetch whatever the current search still needs: its first page, or the next
    // page after "view more" (batchNum) asks for more than has been loaded.
    useEffect(() => {
        const sameQuery = result.key === queryKey;
        const loaded = sameQuery ? result.items.length : 0;
        const wanted = sameQuery ? itemsBatchAmt * batchNum : itemsBatchAmt;
        if (sameQuery && (loaded >= wanted || loaded >= result.total)) return;

        const request = `${queryKey}|${loaded}`;
        if (pending.current === request) return;
        pending.current = request;
        setLoading(loaded === 0 ? 'search' : 'more');

        searchTracks({ ...query, skip: loaded, limit: wanted - loaded })
            .then((page) => {
                if (pending.current !== request) return; // superseded by a newer search
                pending.current = null;
                setLoading(null);
                setResult((prev) => ({
                    key: queryKey,
                    total: page.total,
                    items: (prev.key === queryKey ? prev.items : []).concat(page.items),
                    error: null,
                }));
            })
            .catch((error) => {
                if (pending.current !== request) return;
                pending.current = null;
                setLoading(null);
                console.error(error);
                setResult({ ...emptyResult, key: queryKey, error });
            });
    });

    // Until a new search answers, keep showing the previous results (no flicker).
    return (
        <>
            <FilterIndex itemsCount={result.total}/>

            <div className={`animate-content ${entranceClassName}`} onAnimationEnd={() => setEntranceClassName('')}>
                {shouldPresentWelcomeIntro && <WelcomeMessage cancelWelcomeIntro={cancelWelcomeIntro}/>}
                {loading === 'search' && <Spinner label="Searching tracks" />}
                {result.error && <p className="track-items__error">Couldn't load tracks. Please try again.</p>}
                <ul className="track-items track-items--animated">
                    <Items tracksFiltered={result.items} setPlayerItem={setPlayerItem} />
                </ul>
                {loading === 'more' && <Spinner label="Loading more tracks" />}
            </div>
        </>
    )
};


const mapStateToProps = state => ({
    filteredByTags: state.appData.filteredByTags,
    filteredByPeriods: state.appData.filteredByPeriods,
    filteredBySearch: state.appData.filteredBySearch,
    searchArtistNames: state.appData.searchArtistNames,
    searchTrackTitles: state.appData.searchTrackTitles,
    searchAlbumTitles: state.appData.searchAlbumTitles,
    itemsBatchAmt: state.appData.itemsBatchAmt,
    batchNum: state.appData.batchNum,
    shouldPresentWelcomeIntro: state.appData.shouldPresentWelcomeIntro
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleShareExpansion,
    dispatchMessageToModal,
    setPlayerItem,
    setSpaPageName,
    resetBatch,
    filterByTagCb,
    cancelWelcomeIntro
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
