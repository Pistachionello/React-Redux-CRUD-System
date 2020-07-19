import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk";
import {Provider} from 'react-redux';
import {App} from './App';
import {rootReducer} from "./redux/rootReducer";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/index.css';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

const app = (
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
