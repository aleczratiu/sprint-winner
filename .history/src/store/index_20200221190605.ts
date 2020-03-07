import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer, { initialState } from '../reducers';

const composeEnhancer = composeWithDevTools({
    name: 'React Clean Architecture',
});

const store = createStore(
    rootReducer,
    initialState,
);


export default store;
