import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {App} from './components/App.js';
import {reducer} from './reducers/reducer.js'

import './main.less';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById("root")
);