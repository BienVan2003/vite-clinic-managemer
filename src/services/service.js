import axiosConfig from './axiosConfig'

export const apiServiceList = (username, password) => {
    return axiosConfig.post("/api/auth/login/patient", {username, password});
}

