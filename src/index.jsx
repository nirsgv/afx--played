import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

createRoot(document.getElementById('root')).render(
    <HelmetProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </HelmetProvider>
);
