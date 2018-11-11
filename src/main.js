import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';

import thunk from 'redux-thunk';
import Home from './components/Home.js';
import Cart from './components/Cart.js';
import Checkout from './components/Checkout.js';
import CatchAll from './components/CatchAll.js';
import App from 'grommet/components/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import AppReducer from './reducer/AppReducer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const store = createStore(AppReducer, applyMiddleware(thunk));
ReactDOM.render((
    <Provider store={store}>
        <App centered={false}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route component={CatchAll}/>
                </Switch>
            </Router>
        </App>
    </Provider>
), document.getElementById('app'));