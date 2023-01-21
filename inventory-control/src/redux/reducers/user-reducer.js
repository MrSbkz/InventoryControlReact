const SET_USERS = 'SET_USERS';
const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME';
const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME';
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const UPDATE_CONFIRM_PASSWORD = 'UPDATE_CONFIRM_PASSWORD';
const UPDATE_ROLES = 'UPDATE_ROLES';
const RESET_USER_DATA = 'RESET_USER_DATA';
const SET_USER_DATA = 'SET_USER_DATA';

export const setUsers = (users) => ({type: SET_USERS, users});
export const updateFirstName = (firstName) => ({type: UPDATE_FIRST_NAME, firstName});
export const updateLastName = (lastName) => ({type: UPDATE_LAST_NAME, lastName});
export const updateUsername = (username) => ({type: UPDATE_USERNAME, username});
export const updatePassword = (password) => ({type: UPDATE_PASSWORD, password});
export const updatePasswordConfirm = (passwordConfirm) => ({type: UPDATE_CONFIRM_PASSWORD, passwordConfirm});
export const updateRoles = (role) => ({type: UPDATE_ROLES, role});
export const resetUserData = () => ({type: RESET_USER_DATA});
export const setUserData = (user) => ({type: SET_USER_DATA, user});

let initialState = {
    users: [],
    firstNameText: '',
    lastNameText: '',
    usernameText: '',
    passwordText: '',
    passwordConfirmText: '',
    userRoles: [],
    allRoles: ['admin', 'accountant', 'employee'],
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
                usernameText: action.username
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
                usernameText: '',
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
                usernameText: action.user.username,
                userRoles: action.user.roles,
            }
        }
        default:
            return state;
    }
}

export const getUsers = () => (dispatch) => {
    let users = [
        {
            firstName: "Jon",
            lastName: "Snow",
            username: "admin",
            roles: [
                "admin",
                "accountant",
                "employee",
            ],
        },
        {
            firstName: "Sansa",
            lastName: "Stark",
            username: "sansa.stark",
            roles: [
                "accountant",
            ],
        },
        {
            firstName: "Arya",
            lastName: "Stark",
            username: "arya.stark",
            roles: [
                "admin",
            ],
        },
        {
            firstName: "Ramsay",
            lastName: "Bolton",
            username: "ramsay.bolton",
            roles: [],
        },
        {
            firstName: "Ned",
            lastName: "Stark",
            username: "ned.stark",
            roles: [
                "admin",
            ],
        },
        {
            firstName: "Jaime",
            lastName: "Lannister",
            username: "jaime.lannister",
            roles: [
                "employee",
            ],
        },
        {
            firstName: "Tyrion",
            lastName: "Lannister",
            username: "tyrion.lannister",
            roles: [
                "admin",
            ],
        },
        {
            firstName: "Petyr",
            lastName: "Baelish",
            username: "petyr.baelish",
            roles: [
                "employee",
            ],
        },
        {
            firstName: "Jorah",
            lastName: "Mormont",
            username: "jorah.mormont",
            roles: [
                "employee",
            ],
        },
        {
            firstName: "Theon",
            lastName: "Greyjoy",
            username: "theon.greyjoy",
            roles: [
                "employee",
            ],
        },
    ]
    dispatch(setUsers(users));
}

export default userReducer;