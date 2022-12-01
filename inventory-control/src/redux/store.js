import { combineReducers, applyMiddleware, legacy_createStore as createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './reducers/auth-reducer'

let reducers = combineReducers({
    authReducer: authReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;