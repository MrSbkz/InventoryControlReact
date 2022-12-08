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
    usernameText: '',
    passText: '',
    roles: [],
    isAuthorised: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN: {
            localStorage.setItem(INVENTORY_CONTROL_TOKEN, JSON.stringify(action.token));
            return {
                ...state,
                isAuthorised: true,
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
                usernameText: action.username,
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
                isAuthorised: false,
            };
        }
        case CHECK_AUTHORIZATION: {
            if (localStorage.getItem(INVENTORY_CONTROL_TOKEN)) {
                return {
                    ...state,
                    isAuthorised: true,
                }
            }
            return state;
        }
        case SET_ROLES: {
            if(state.roles.length > 0){
                return state
            }
            return {
                ...state,
                roles: ['admin', 'employee', 'accountant'],
            }
        }
        default:
            return state;
    }
}

export const setToken = (token) => ({type: SET_TOKEN, token});
export const setAuthErrors = (errors) => ({type: SET_AUTH_ERRORS, errors});
export const updateUsernameText = (username) => ({type: UPDATE_USERNAME, username});
export const updatePassText = (password) => ({type: UPDATE_PASSWORD, password});
export const resetAuthErrors = () => ({type: RESET_AUTH_ERRORS});
export const checkAuthorization = () => ({type: CHECK_AUTHORIZATION});
export const logout = () => ({type: LOGOUT});
export const setRoles = (roles) => ({type: SET_ROLES, roles});

export const getRoles = () => (dispatch) => {
    let roles = ['admin', 'employee', 'accountant']
    dispatch(setRoles(roles));
}

export const login = (username, password) => (dispatch) => {
    let isAuth = username === 'admin' && password === '123'
    let response;
    if (isAuth) {
        response = {
            status: 200,
            token: "sometoken12345",
        }
    }
    else {
        response = {
            status: 400,
            errors: ["Incorrect username or password", "Another error", "Errrrrrrror!", "Ooooops"],
        }
    }
    
    switch (response.status){
        case 200:{
            dispatch(setToken(response.token));
            break;
        }
        case 400:{
            dispatch(setAuthErrors(response.errors));
            break;
        }
        default:
            break;
    }

}

export default authReducer;