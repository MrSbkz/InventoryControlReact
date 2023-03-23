import {deviceAPI} from "../../api/api";

const SET_DEVICES = 'SET_DEVICES';
const SET_USER_NAMES = 'SET_USER_NAMES';
const CHANGE_DEVICE_NAME = 'CHANGE_DEVICE_NAME';
const SET_DEVICE_PAGES = 'SET_DEVICE_PAGES';
const SET_NEW_DEVICE = 'SET_NEW_DEVICE';
const CHANGE_NEW_DEVICE_NAME = 'CHANGE_NEW_DEVICE_NAME';
const CHANGE_NEW_DEVICE_ASSIGNMENT = 'CHANGE_NEW_DEVICE_ASSIGNMENT';
const CHANGE_DEVICE_ASSIGNMENT = 'CHANGE_DEVICE_ASSIGNMENT';
const SET_UPDATED_DEVICE = 'SET_UPDATED_DEVICE';
const SET_DEVICE_ASSIGNMENTS = 'SET_DEVICE_ASSIGNMENTS';
const UPDATE_SEARCH_DEVICE_STRING = 'UPDATE_SEARCH_DEVICE_STRING';
const CHANGE_SHOW_DECOMMISSION_DEVICES = 'CHANGE_SHOW_DECOMMISSION_DEVICES';
const SET_DECOMMISSION_DEVICE = 'SET_DECOMMISSION_DEVICE';
const CHANGE_SHOW_UNASSIGNED_DEVICES = 'CHANGE_SHOW_UNASSIGNED_DEVICES';
const SET_DEVICE_HISTORY = 'SET_DEVICE_HISTORY';

export const setDevices = (devices) => ({type: SET_DEVICES, devices});
export const setUserNames = (users) => ({type: SET_USER_NAMES, users});
export const changeDeviceName = (device) => ({type: CHANGE_DEVICE_NAME, device});
export const changeNewDeviceName = (deviceName) => ({type: CHANGE_NEW_DEVICE_NAME, deviceName});
export const setDevicePages = (currentPage, totalPages) => ({type: SET_DEVICE_PAGES, currentPage, totalPages});
export const setNewDevice = (device) => ({type: SET_NEW_DEVICE, device});
export const changeNewDeviceAssignment = (user) => ({type: CHANGE_NEW_DEVICE_ASSIGNMENT, user});
export const changeDeviceAssignment = (device) => ({type: CHANGE_DEVICE_ASSIGNMENT, device});
export const setUpdatedDevice = (device) => ({type: SET_UPDATED_DEVICE, device});
export const setDeviceAssignments = (assignment) => ({type: SET_DEVICE_ASSIGNMENTS, assignment});
export const updateSearchDeviceString = (searchString) => ({type: UPDATE_SEARCH_DEVICE_STRING, searchString});
export const changeShowDecommissionDevices = () => ({type: CHANGE_SHOW_DECOMMISSION_DEVICES});
export const changeShowUnassignedDevices = () => ({type: CHANGE_SHOW_UNASSIGNED_DEVICES});
export const setDecommissionDevice = (device) => ({type: SET_DECOMMISSION_DEVICE, device});
export const setDeviceHistory = (deviceHistory) => ({type: SET_DEVICE_HISTORY, deviceHistory});

let initialState = {
    devices: [],
    users: [],
    deviceNames: [],
    currentPage: 1,
    totalPages: 0,
    searchString: '',
    showDecommissionDevice: false,
    showUnassignedDevices: false,
    newDeviceName: '',
    newDeviceAssignment: {},
    deviceAssignments: [],
    deviceHistory: [],
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
                devices: [...state.devices, action.device],
                deviceNames: [...state.deviceNames, {id: action.device.id, name: action.device.name}]
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
        case CHANGE_DEVICE_ASSIGNMENT: {
            return {
                ...state,
                devices: state.devices.map(d => d.id === action.device.id ? action.device : d)
            }
        }
        case SET_UPDATED_DEVICE: {
            return {
                ...state,
                devices: state.devices.map(d => d.id === action.device.id ? action.device : d)
            }
        }
        case SET_DEVICE_ASSIGNMENTS: {
            let assignment = state.deviceAssignments.find(x => x.id === action.assignment.id);
            if(assignment){
                assignment.user = action.assignment.user;
                return {
                    ...state,
                    deviceAssignments: state.deviceAssignments.map(d => d.id === assignment.id ? assignment : d)
                }
            }
            else {
                return {
                    ...state,
                    deviceAssignments: [...state.deviceAssignments, action.assignment]
                }
            }
            
        }
        case UPDATE_SEARCH_DEVICE_STRING: {
            return {
                ...state,
                searchString: action.searchString
            }
        }
        case CHANGE_SHOW_DECOMMISSION_DEVICES: {
            return {
                ...state,
                showDecommissionDevice: !state.showDecommissionDevice
            }
        }
        case CHANGE_SHOW_UNASSIGNED_DEVICES: {
            return {
                ...state,
                showUnassignedDevices: !state.showUnassignedDevices
            }
        }
        case SET_DECOMMISSION_DEVICE: {
            if(state.showDecommissionDevice){
                return {
                    ...state,
                    devices: state.devices.map(d => d.id === action.device.id ? action.device : d)
                }
            }
            
            return {
                ...state,
                devices: state.devices.filter(d => d.id !== action.device.id)
            }
        }
        case SET_DEVICE_HISTORY: {
            return {
                ...state,
                deviceHistory: action.deviceHistory,
            }
        }

        default:
            return state;
    }
}

export const getDevices = (currentPage, searchString, showDecommissionDevice, showUnassignedDevices) => (dispatch) => {
    deviceAPI.getDevices(currentPage, searchString, showDecommissionDevice, showUnassignedDevices).then(response => {
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
            let users = [{fullName: 'Unassigned',userName: null}];
            users = users.concat(response.data.data);
            dispatch(setUserNames(users));
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
            console.log(response.data)
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

export const updateDevice = (device) => (dispatch) => {
    deviceAPI.updateDevice(device).then(response => {
        if (response.data.isSuccess) {
            dispatch(setUpdatedDevice(response.data.data));
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

export const decommissionDevice = (deviceId) => (dispatch) => {
    deviceAPI.decommissionDevice(deviceId).then(response => {
        if (response.data.isSuccess) {
            dispatch(setDecommissionDevice(response.data.data));
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

export const getDeviceHistory = (deviceId) => (dispatch) => {
    deviceAPI.getDeviceHistory(deviceId).then(response => {
        if (response.data.isSuccess) {
            dispatch(setDeviceHistory(response.data.data));
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