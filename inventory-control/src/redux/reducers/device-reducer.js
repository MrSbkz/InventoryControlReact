const SET_DEVICES = 'SET_DEVICES';
const SET_USER_NAMES = 'SET_USER_NAMES';
const CHANGE_DEVICE_NAME = 'CHANGE_DEVICE_NAME';

export const setDevices = (devices) => ({type: SET_DEVICES, devices});
export const setUserNames = (users) => ({type: SET_USER_NAMES, users});
export const changesDeviceName = (device) => ({type: CHANGE_DEVICE_NAME, device});

let initialState = {
    devices: [],
    users: [],
    deviceNames: [],
};

const deviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEVICES: {
            let deviceNames = action.devices.map(x => {
                return {id: x.id, name: x.name}
            });
            return {
                ...state,
                devices: action.devices,
                deviceNames: deviceNames,
            }
        }
        case SET_USER_NAMES: {
            return {
                ...state,
                users: action.users
            }
        }
        case CHANGE_DEVICE_NAME: {
            let deviceNames = state.deviceNames;
            return {
                ...state,
                deviceNames: deviceNames.map(d => {
                    return d.id === action.device.id
                        ? action.device
                        : d
                })
            }
        }

        default:
            return state;
    }
}

export const getDevices = () => (dispatch) => {
    let devices = [
        {
            id: 1,
            name: 'Laptop HP',
            registerDate: '2011-11-11 15:00:00',
            assignedTo: {
                fullName: 'Jaime Lannister',
                username: 'jaime.lannister'
            },
            decommissionDate: null
        },
        {
            id: 2,
            name: 'Laptop Acer',
            registerDate: '2011-11-11 15:00:00',
            assignedTo: {
                fullName: 'Petyr Baelish',
                username: 'petyr.baelish'
            },
            decommissionDate: null
        },
    ]
    dispatch(setDevices(devices));
}

export const getUserNames = () => (dispatch) => {
    let users = [
        {
            fullName: 'Jaime Lannister',
            username: 'jaime.lannister'
        },
        {
            fullName: 'Petyr Baelish',
            username: 'petyr.baelish'
        },
        {
            fullName: 'Jorah Mormont',
            username: 'jorah.mormont'
        },
        {
            fullName: 'Theon Greyjoy',
            username: 'theon.greyjoy'
        },
    ]
    dispatch(setUserNames(users));
}

export default deviceReducer;