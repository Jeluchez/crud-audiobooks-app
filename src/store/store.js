import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { bookReducers } from '../reducers/bookReducers';
import { uiReducer } from '../reducers/uiReducers';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose;
const reducers = combineReducers({
    books: bookReducers,
    ui: uiReducer
})
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
   
);

