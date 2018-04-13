import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {App} from './components/App.js';

import './main.less';

const reducer = (state, action) => {
    if (state === undefined) {
        state = {
            movies: [],
            isLoading: false,
            isError: false
        }
        return state;
    }

    let newState = Object.assign({}, state);

    switch (action.type) {
        case "SEARCH_MOVIES_START": 
            newState.isLoading = true;
            break;
        case "SEARCH_MOVIES_SUCCESS": 
            newState.isLoading = false;
            newState.movies = action.payload;
            break;
        case "SEARCH_MOVIES_FAILURE":
            newState.isLoading = false;
            newState.isError = true;
            break;
        default: 
            return state;
    }

    return newState;
}

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById("root")
);