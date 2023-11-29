/* eslint-disable no-undef */
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5023'
});

instance.interceptors.request.use(function (config) {

    let token = window.localStorage.getItem('accessToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {

    return response.data;
}, function (error) {
    return error.response.data;
});


export default instance