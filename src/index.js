import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import createSagaMiddleware from "redux-saga";

import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import coffeemachineReducer from './store/reducers/coffeemachine';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
//import { watchAuth, watchCoffeeMachine, watchOrder } from "./store/sagas";

//redux setup Start
const composeEnhancers = 
    process.env.NODE_ENV === 'development' 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    : null || compose;

const rootReducer = combineReducers({
    coffeemachine: coffeemachineReducer,
    order: orderReducer,
    auth: authReducer
});

//redux-saga
//const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
//redux setup End

// sagaMiddleware.run(watchAuth);
// sagaMiddleware.run(watchCoffeeMachine);
// sagaMiddleware.run(watchOrder);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
