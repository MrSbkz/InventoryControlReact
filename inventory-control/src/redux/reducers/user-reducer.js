const SET_USERS = 'GET_USERS';

let initialState = {
    users: [],
    user: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        default:
            return state;
    }
}

export const setUsers = (users) => ({type: SET_USERS, users});

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
    ]
    dispatch(setUsers(users));
}

export default userReducer;