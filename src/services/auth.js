import axiosConfig from './axiosConfig';

export const apiLoginPatient = (username, password) => {
    return axiosConfig.post("/api/auth/login/patient", { username, password });
}

export const apiSignupPatient = (username, name, password, email, numberPhone) => {
    return axiosConfig.post("/api/auth/signup", { username, name, password, email, numberPhone });
}

export const apiLoginAdmin = (username, password) => {
    return axiosConfig.post("/api/auth/login/admin", { username, password });
}

export const apiLoginDoctor = (username, password) => {
    return axiosConfig.post("/api/auth/login/doctor", { username, password });
}

export const apiSignupDoctor = (object) => {
    return axiosConfig.post("/api/auth/signup/doctor", object);
}