import axios from 'axios';

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
        return instance.post(`auth/login`, { username, password })
            .then(response => {
                return response
            })
            .catch(error => {
                return error.response
            })
    },
    register(username, password) {
        return instance.post(`auth/register`, { username, password })
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