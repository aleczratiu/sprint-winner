import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// import rootReducer, { initialState } from './reducers';


const store = createStore(
    { user: null },
    {},
);


export default store;
