import axios from 'axios';
import {makeUserInactive} from "../redux/reducers/user-reducer";

const defaultOptions = {
    baseURL: 'https://inventorycontrol.up.railway.app/',
    headers: {
        'Content-Type': 'application/json',
    },
};

let instance = axios.create(defaultOptions);

instance.interceptors.request.use(function (config) {
    let token = JSON.parse(localStorage.getItem('inventory-control-token'));
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export const authAPI = {
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
        return instance.get(`role/list`)
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
    }
}