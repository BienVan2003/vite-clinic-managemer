/* eslint-disable no-undef */
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5023'
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // Attach token to the header
    let token = window.localStorage.getItem('accessToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // refresh token
    return response.data ? response.data : { statusCode: response.status };
}, function (error) {
    console.log('Error: ' + error);
    let res = {};
    if (error.response) {
        res.data = error.response.data;
        res.status = error.response.status;
        res.headers = error.response.headers;
    } else if (error.request) {
        console.log('error.request: ' + error.request);
    } else {
        console.log('Error', error.message);
    }
    return res;
    // return Promise.reject(error);
});


export default instance