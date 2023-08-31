import MoviesData from "./MoviesData";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';


ReactDOM.render(
    <Provider store={store}>
        <MoviesData />
    </Provider>,
    document.getElementById('root')
);

