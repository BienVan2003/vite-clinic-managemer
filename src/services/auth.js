import axiosConfig from './axiosConfig'

export const apiLogin = (username, password) => {
    return axiosConfig.post("/api/auth/login/patient", {username, password});
}

export const apiSignup = (username, name, password, email, phoneNumber) => {
    return axiosConfig.post("/api/auth/signup", {username, name, password, email, phoneNumber});
}

export const apiAdminLogin = (username, password) => {
    return axiosConfig.post("/api/auth/login/admin", {username, password});
}
