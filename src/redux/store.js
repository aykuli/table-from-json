import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import middleware from './middleware';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, storeEnhancers(applyMiddleware(middleware)));

export default store;
