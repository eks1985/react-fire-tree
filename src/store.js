import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
//middlewares
import thunk from 'redux-thunk';

const middlewares = [thunk];

const initialState = {};

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(rootReducer, initialState,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
