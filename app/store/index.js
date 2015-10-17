import {createStore, combineReducers} from 'redux';

import * as reducers from './reducers';
let rootReducer = combineReducers(reducers);

export default createStore(rootReducer);
