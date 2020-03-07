import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import epicMiddleware, { rootEpic } from './epics';

import rootReducer, { initialState } from './reducers';


const store = createStore(
    rootReducer,
    initialState,
);


export default store;
