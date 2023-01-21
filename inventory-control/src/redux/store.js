import { combineReducers, applyMiddleware, legacy_createStore as createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './reducers/auth-reducer'
import localizationReducer from "./reducers/localization-reducer";
import userReducer from "./reducers/user-reducer";
import deviceReducer from "./reducers/device-reducer";

let reducers = combineReducers({
    authReducer: authReducer,
    localizationReducer: localizationReducer,
    userReducer: userReducer,
    deviceReducer: deviceReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;