import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { addTrackById, addSongById } from './actions';

const store = createStore(rootReducer);
store.subscribe(() => console.log('store.getState( i am subscribed )', store.getState()));
// store.dispatch(addTrackById(2));
// store.dispatch(addSongById(2));

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
