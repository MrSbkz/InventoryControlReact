import {userAPI} from "../../api/api";

const SET_USERS = 'SET_USERS';
const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME';
const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME';
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const UPDATE_CONFIRM_PASSWORD = 'UPDATE_CONFIRM_PASSWORD';
const UPDATE_ROLES = 'UPDATE_ROLES';
const RESET_USER_DATA = 'RESET_USER_DATA';
const SET_USER_DATA = 'SET_USER_DATA';
const SET_PAGES = 'SET_PAGES';

export const setUsers = (users) => ({type: SET_USERS, users});
export const updateFirstName = (firstName) => ({type: UPDATE_FIRST_NAME, firstName});
export const updateLastName = (lastName) => ({type: UPDATE_LAST_NAME, lastName});
export const updateUsername = (userName) => ({type: UPDATE_USERNAME, userName});
export const updatePassword = (password) => ({type: UPDATE_PASSWORD, password});
export const updatePasswordConfirm = (passwordConfirm) => ({type: UPDATE_CONFIRM_PASSWORD, passwordConfirm});
export const updateRoles = (role) => ({type: UPDATE_ROLES, role});
export const resetUserData = () => ({type: RESET_USER_DATA});
export const setUserData = (user) => ({type: SET_USER_DATA, user});
export const setPages = (currentPage, totalPages) => ({type: SET_PAGES, currentPage, totalPages});

let initialState = {
    users: [],
    firstNameText: '',
    lastNameText: '',
    userNameText: '',
    passwordText: '',
    passwordConfirmText: '',
    userRoles: [],
    allRoles: ['admin', 'accountant', 'employee'],
    currentPage: 0,
    totalPages: 0,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case UPDATE_FIRST_NAME: {
            return {
                ...state,
                firstNameText: action.firstName
            }
        }
        case UPDATE_LAST_NAME: {
            return {
                ...state,
                lastNameText: action.lastName
            }
        }
        case UPDATE_USERNAME: {
            return {
                ...state,
                usernameText: action.userName
            }
        }
        case UPDATE_PASSWORD: {
            return {
                ...state,
                passwordText: action.password
            }
        }
        case UPDATE_CONFIRM_PASSWORD: {
            return {
                ...state,
                passwordConfirmText: action.passwordConfirm
            }
        }
        case UPDATE_ROLES: {
            if (!state.userRoles.includes(action.role)) {
                return {
                    ...state,
                    userRoles: [...state.userRoles, action.role]
                }
            }
            return {
                ...state,
                userRoles: [...state.userRoles.map(x => {
                    if (x !== action.role) {
                        return x;
                    }
                    return null;
                })]
            }
        }
        case RESET_USER_DATA: {
            return {
                ...state,
                firstNameText: '',
                lastNameText: '',
                userNameText: '',
                passwordText: '',
                passwordConfirmText: '',
                userRoles: []
            }
        }
        case SET_USER_DATA: {
            return {
                ...state,
                firstNameText: action.user.firstName,
                lastNameText: action.user.lastName,
                userNameText: action.user.userName,
                userRoles: action.user.roles,
            }
        }
        case SET_PAGES: {
            console.log(action)
            return {
                ...state,
                currentPage: action.currentPage,
                totalPages: action.totalPages,
            }
        }
        default:
            return state;
    }
}

export const getUsers = (currentPage) => (dispatch) => {
    userAPI.getUsers(currentPage).then(response=>{
        if (response.data.isSuccess) {
            dispatch(setUsers(response.data.data.content));
            dispatch(setPages(response.data.data.currentPage, response.data.data.totalPages));
        } else {
            switch (response.status) {
                case 500:
                    break;
                default:
                    break;
            }
        }
    });
}

export default userReducer;