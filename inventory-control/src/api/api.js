import axios from 'axios';

const defaultOptions = {
    baseURL: 'https://inventorycontrol.up.railway.app/',
    headers: {
        'Content-Type': 'application/json',
    },
};

const FileDownload = require('js-file-download');

let instance = axios.create(defaultOptions);

instance.interceptors.request.use(function (config) {
    let token = JSON.parse(localStorage.getItem('inventory-control-token'));
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export  const authAPI = {
     login(username, password) {
        return instance.post(`auth/login`, {username, password})
            .then(response => {
                return response
            })
            .catch(error => {
                return error.response
            })
    },
    register(username, password) {
        return instance.post(`auth/register`, {username, password})
            .then(response => {
                return response
            })
            .catch(error => {
                return error.response
            })
    },
    getRoles() {
        return instance.get(`role/user/list`)
            .then(response => {
                return response
            })
            .catch(error => {
                return error.response
            })
    }
}

export const userAPI = {
    getUsers(currentPage, searchString, showInactiveUsers) {
        return instance.get(`user/list?pageSize=${10}&currentPage=${currentPage}&searchString=${searchString}&showInactiveUsers=${showInactiveUsers}`)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response
            })
    },
    addUser(user) {
        return instance.post('user', user)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response
            })
    },
    updateUser(user) {
        return instance.put('user', user)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response
            })
    },
    makeUserInactive(userName) {
        return instance.delete(`user?userName=${userName}`)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response
            })
    },
    restoreUser(userName) {
        return instance.put(`user/restore?userName=${userName}`)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response
            })
    },
    getUser() {
        return instance.get(`user`)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response
            })
    }
}

export const deviceAPI = {
    getDevices(currentPage, searchString, showDecommissionDevice, showUnassignedDevices) {
        return instance.get(`device/list?pageSize=${10}&currentPage=${currentPage}&searchString=${searchString}&showDecommissionDevice=${showDecommissionDevice}&showUnassignedDevices=${showUnassignedDevices}`)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response
            })
    },
    downloadQRCode(deviceId) {
        return instance.get(`device/qr-code?deviceId=${deviceId}`,{responseType: 'blob'})
            .then(response => {
                FileDownload(response.data, `${deviceId}.png`);
                return response;
            })
            .catch(error => {
                return error.response
            })
    },
    getEmployees() {
        return instance.get(`device/employees`)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response
            })
    },
    addDevice(device) {
        return instance.post(`device`, device)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response
            })
    },
    updateDevice(device) {
        return instance.put(`device`, device)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response
            })
    },
    decommissionDevice(deviceId) {
        return instance.delete(`device?deviceId=${deviceId}`)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response
            })
    },
}