import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import Store from "./Store";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <BrowserRouter>
    <Provider store={Store}>
        <App/>
    </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
