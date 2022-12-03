const LOGIN = 'LOGIN';
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const RESET_AUTH_ERRORS = 'RESET_AUTH_ERRORS';
const CHECK_AUTHORIZATION = 'CHECK_AUTHORIZATION';
const LOGOUT = 'LOGOUT';
const GET_ROLES = 'GET_ROLES';
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
        case LOGIN: {
            let isAuth = action.username === 'admin' && action.password === '123'
            if (isAuth) {
                localStorage.setItem(INVENTORY_CONTROL_TOKEN, JSON.stringify("sometoken12345"));
            }
            return {
                ...state,
                authErrors: !isAuth ? ["Incorrect username or password", "Another error", "Errrrrrrror!", "Ooooops"] : [],
                isAuthorised: isAuth
            }
        }
        case UPDATE_USERNAME: {
            return {
                ...state,
                usernameText: action.username
            }
        }
        case UPDATE_PASSWORD: {
            return {
                ...state,
                passText: action.password
            }
        }
        case RESET_AUTH_ERRORS: {
            return {
                ...state,
                authErrors: []
            }
        }
        case LOGOUT: {
            localStorage.removeItem(INVENTORY_CONTROL_TOKEN);
            return {
                ...state,
                isAuthorised: false
            };
        }
        case CHECK_AUTHORIZATION: {
            if (localStorage.getItem(INVENTORY_CONTROL_TOKEN)) {
                return {
                    ...state,
                    isAuthorised: true
                }
            }
            return state;
        }
        case GET_ROLES: {
            if(state.roles.length > 0){
                return state
            }
            return {
                ...state,
                roles: ['admin', 'employee', 'accountant']
            }
        }
        default:
            return state;
    }
}

export const login = (username, password) => ({type: LOGIN, username, password});
export const updateUsernameText = (username) => ({type: UPDATE_USERNAME, username});
export const updatePassText = (password) => ({type: UPDATE_PASSWORD, password});
export const resetAuthErrors = () => ({type: RESET_AUTH_ERRORS});
export const checkAuthorization = () => ({type: CHECK_AUTHORIZATION});
export const logout = () => ({type: LOGOUT});
export const getRoles = () => ({type: GET_ROLES});

export default authReducer;