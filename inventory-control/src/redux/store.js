import { combineReducers, applyMiddleware, legacy_createStore as createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './reducers/auth-reducer'
import localizationReducer from "./reducers/localization-reducer";

let reducers = combineReducers({
    authReducer: authReducer,
    localizationReducer: localizationReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;