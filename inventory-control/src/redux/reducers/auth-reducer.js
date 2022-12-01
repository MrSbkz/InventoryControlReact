
const LOGIN = 'LOGIN';
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

let initialState = {
    emailText: '',
    authErrors:[],
    usernameText: '',
    passText:''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            let isAuth = action.username === 'admin' && action.password === '123'
            return {
                ...state,
                authErrors: !isAuth ? ["Incorrect username or password"] : [action.username]
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
        default:
            return state;
    }
}

export const login = (username, password) => ({ type: LOGIN, username, password});
export const updateUsernameText = (username) => ({ type: UPDATE_USERNAME, username});
export const updatePassText = (password) => ({ type: UPDATE_PASSWORD, password});

export default authReducer;