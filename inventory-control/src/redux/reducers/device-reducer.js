import {deviceAPI} from "../../api/api";

const SET_DEVICES = 'SET_DEVICES';
const SET_USER_NAMES = 'SET_USER_NAMES';
const CHANGE_DEVICE_NAME = 'CHANGE_DEVICE_NAME';
const SET_DEVICE_PAGES = 'SET_DEVICE_PAGES';
const SET_NEW_DEVICE = 'SET_NEW_DEVICE';
const CHANGE_NEW_DEVICE_NAME = 'CHANGE_NEW_DEVICE_NAME';
const CHANGE_NEW_DEVICE_ASSIGNMENT = 'CHANGE_NEW_DEVICE_ASSIGNMENT';

export const setDevices = (devices) => ({type: SET_DEVICES, devices});
export const setUserNames = (users) => ({type: SET_USER_NAMES, users});
export const changeDeviceName = (device) => ({type: CHANGE_DEVICE_NAME, device});
export const changeNewDeviceName = (deviceName) => ({type: CHANGE_NEW_DEVICE_NAME, deviceName});
export const setDevicePages = (currentPage, totalPages) => ({type: SET_DEVICE_PAGES, currentPage, totalPages});
export const setNewDevice = (device) => ({type: SET_NEW_DEVICE, device});
export const changeNewDeviceAssignment = (user) => ({type: CHANGE_NEW_DEVICE_ASSIGNMENT, user});

let initialState = {
    devices: [],
    users: [],
    deviceNames: [],
    currentPage: 1,
    totalPages: 0,
    searchString: '',
    showDecommissionDevice: false,
    newDeviceName: '',
    newDeviceAssignment: {},
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
        case SET_DEVICE_PAGES: {
            return {
                ...state,
                currentPage: action.currentPage,
                totalPages: action.totalPages,
            }
        }
        case SET_NEW_DEVICE: {
            return {
                ...state,
                devices: [...state.devices, action.device]
            }
        }
        case CHANGE_NEW_DEVICE_NAME: {
            return {
                ...state,
                newDeviceName: action.deviceName
            }
        }
        case CHANGE_NEW_DEVICE_ASSIGNMENT: {
            return {
                ...state,
                newDeviceAssignment: action.user
            }
        }

        default:
            return state;
    }
}

export const getDevices = (currentPage, searchString, showDecommissionDevice) => (dispatch) => {
    deviceAPI.getDevices(currentPage, searchString, showDecommissionDevice).then(response => {
        if (response.data.isSuccess) {
            dispatch(setDevices(response.data.data.content));
            dispatch(setDevicePages(response.data.data.currentPage, response.data.data.totalPages));
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

export const downloadQRCode = (deviceId) => (dispatch) => {
    deviceAPI.downloadQRCode(deviceId).then(response => {
        if (response.data.isSuccess) {
            dispatch(setDevices(response.data.data.content));
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

export const getUserNames = () => (dispatch) => {
    deviceAPI.getEmployees().then(response => {
        if (response.data.isSuccess) {
            dispatch(setUserNames(response.data.data));
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

export const addDevice = (device) => (dispatch) => {
    deviceAPI.addDevice(device).then(response => {
        if (response.data.isSuccess) {
            dispatch(setNewDevice(response.data.data));
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

export default deviceReducer;