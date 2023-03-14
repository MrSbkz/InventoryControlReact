import {authAPI} from "../../api/api";

const SET_TOKEN = 'SET_TOKEN';
const SET_AUTH_ERRORS = 'SET_AUTH_ERRORS';
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const RESET_AUTH_ERRORS = 'RESET_AUTH_ERRORS';
const CHECK_AUTHORIZATION = 'CHECK_AUTHORIZATION';
const LOGOUT = 'LOGOUT';
const SET_ROLES = 'SET_ROLES';
const INVENTORY_CONTROL_TOKEN = 'inventory-control-token'

let initialState = {
    emailText: '',
    authErrors: [],
    userNameText: '',
    passText: '',
    roles: [],
    isAuthorized: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN: {
            localStorage.setItem(INVENTORY_CONTROL_TOKEN, JSON.stringify(action.token));
            window.location.href = '/profile';
            return {
                ...state,
                isAuthorized: true,
            }
        }
        case SET_AUTH_ERRORS: {
            return {
                ...state,
                authErrors: action.errors,
            }
        }
        case UPDATE_USERNAME: {
            return {
                ...state,
                userNameText: action.userName,
            }
        }
        case UPDATE_PASSWORD: {
            return {
                ...state,
                passText: action.password,
            }
        }
        case RESET_AUTH_ERRORS: {
            return {
                ...state,
                authErrors: [],
            }
        }
        case LOGOUT: {
            localStorage.removeItem(INVENTORY_CONTROL_TOKEN);
            return {
                ...state,
                isAuthorized: false,
                roles: [],
            };
        }
        case CHECK_AUTHORIZATION: {
            if (localStorage.getItem(INVENTORY_CONTROL_TOKEN)) {
                return {
                    ...state,
                    isAuthorized: true,
                }
            }
            return state;
        }
        case SET_ROLES: {
            if (state.roles.length > 0) {
                return state;
            }
            return {
                ...state,
                roles: action.roles,
            }
        }
        default:
            return state;
    }
}

export const setToken = (token) => ({type: SET_TOKEN, token});
export const setAuthErrors = (errors) => ({type: SET_AUTH_ERRORS, errors});
export const updateUserNameText = (userName) => ({type: UPDATE_USERNAME, userName});
export const updatePassText = (password) => ({type: UPDATE_PASSWORD, password});
export const resetAuthErrors = () => ({type: RESET_AUTH_ERRORS});
export const checkAuthorization = () => ({type: CHECK_AUTHORIZATION});
export const logout = () => ({type: LOGOUT});
export const setRoles = (roles) => ({type: SET_ROLES, roles});

export const getRoles = () => (dispatch) => {
    authAPI.getRoles().then(response => {
        if (response.data.isSuccess) {
            dispatch(setRoles(response.data.data));
        } else {
            switch (response.status) {
                case 500:
                    dispatch(setAuthErrors(response.data.errors));
                    break;
                default:
                    break;
            }
        }
    })
}

export const login = (userName, password) => (dispatch) => {
    authAPI.login(userName, password).then(response => {
        if (response.data.isSuccess) {
            dispatch(setToken(response.data.data.token));
        } else {
            switch (response.status) {
                case 400:
                    dispatch(setAuthErrors(response.data.errors));
                    break;
                case 500:
                    dispatch(setAuthErrors(['Server error']));
                    break;
                default:
                    break;
            }
        }
    });
}

export default authReducer;