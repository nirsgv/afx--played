import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { createStore } from 'redux';
import rootReducer from './reducers';

export const renderWithStore = (ui, store = createStore(rootReducer)) =>
    render(
        <HelmetProvider>
            <Provider store={store}>{ui}</Provider>
        </HelmetProvider>
    );
