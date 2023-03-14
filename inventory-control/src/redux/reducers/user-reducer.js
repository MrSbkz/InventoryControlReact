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
const SET_NEW_USER = 'SET_NEW_USER';
const SET_UPDATED_USER = 'SET_UPDATED_USER';
const SET_USER_ERRORS = 'SET_USER_ERRORS';
const RESET_USER_ERRORS = 'RESET_USER_ERRORS';
const CHANGE_SHOW_INACTIVE_USERS = 'CHANGE_SHOW_INACTIVE_USERS';
const UPDATE_SEARCH_STRING = 'UPDATE_SEARCH_STRING';
const SET_CURRENT_USER = 'SET_CURRENT_USER';

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
export const setNewUser = (user) => ({type: SET_NEW_USER, user});
export const setUpdatedUser = (user) => ({type: SET_UPDATED_USER, user});
export const setUserErrors = (errors) => ({type: SET_USER_ERRORS, errors});
export const resetUserErrors = (errors) => ({type: RESET_USER_ERRORS, errors});
export const changeShowInactiveUsers = () => ({type: CHANGE_SHOW_INACTIVE_USERS});
export const updateSearchString = (searchString) => ({type: UPDATE_SEARCH_STRING, searchString});
export const setCurrentUser = (user) => ({type: SET_CURRENT_USER, user});

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
    isLastPage: false,
    userErrors: [],
    showInactiveUsers: false,
    searchString: '',
    currentUser: {},
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
                userNameText: action.userName
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
                userRoles: [...state.userRoles.filter(x => x !== action.role)]
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
            return {
                ...state,
                currentPage: action.currentPage,
                totalPages: action.totalPages,
                isLastPage: action.currentPage === action.totalPages
            }
        }
        case SET_NEW_USER: {
            return {
                ...state,
                users: [...state.users, action.user]
            }
        }
        case SET_UPDATED_USER: {
            return {
                ...state,
                users: state.users.map(u => {
                    return u.userName === action.user.userName
                        ? action.user
                        : u
                })
            }
        }
        case SET_USER_ERRORS: {
            return {
                ...state,
                userErrors: action.errors
            }
        }
        case RESET_USER_ERRORS: {
            return {
                ...state,
                userErrors: []
            }
        }
        case CHANGE_SHOW_INACTIVE_USERS: {
            return {
                ...state,
                showInactiveUsers: !state.showInactiveUsers
            }
        }
        case UPDATE_SEARCH_STRING: {
            return {
                ...state,
                searchString: action.searchString
            }
        }
        case SET_CURRENT_USER: {
            return {
                ...state,
                currentUser: action.user
            }
        }
        default:
            return state;
    }
}

export const getUsers = (currentPage, searchString, showInactiveUsers) => (dispatch) => {
    userAPI.getUsers(currentPage, searchString, showInactiveUsers).then(response => {
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

export const addUser = (user) => (dispatch) => {
    userAPI.addUser(user).then(response => {
        if (response.data.isSuccess) {
            dispatch(setNewUser(user));
        } else {
            switch (response.status) {
                case 400:
                    dispatch(setUserErrors(response.data.errors))
                    break;
                case 500:
                    break;
                default:
                    break;
            }
        }
    });
}

export const  updateUser = (user) => (dispatch) => {
    userAPI.updateUser(user).then(response => {
        if (response.data.isSuccess) {
            dispatch(setUpdatedUser(user));
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

export const makeUserInactive = (userName, currentPage, searchString, showInactiveUsers) => (dispatch) => {
    userAPI.makeUserInactive(userName).then(response => {
        if (response.data.isSuccess) {
            dispatch(getUsers(currentPage, searchString, showInactiveUsers));
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

export const restoreUser = (userName, currentPage, searchString, showInactiveUsers) => (dispatch) => {
    userAPI.restoreUser(userName).then(response => {
        if (response.data.isSuccess) {
            dispatch(getUsers(currentPage, searchString, showInactiveUsers));
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

export const getUser = () => (dispatch) => {
    userAPI.getUser().then(response => {
        if (response.data.isSuccess) {
            dispatch(setCurrentUser(response.data.data));
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