import axiosConfig from './axiosConfig'

export const apiDoctorList = () => {
    return axiosConfig.get("/api/doctor");
}

export const apiDoctorListByServiceID = (id) => {
    return axiosConfig.get("/api/doctor/service/" + id);
}

export const apiGetDoctorId = (id) => {
    return axiosConfig.get(`/api/doctor/${id}`);
}

export const apiEditDoctor = (id, doctor) => {
    return axiosConfig.put(`/api/doctor/update/${id}`, doctor);
}

export const apiLockDoctor = (id) => {
    return axiosConfig.delete(`/api/doctor/lock/${id}`);
}

export const apiUnlockDoctor = (id) => {
    return axiosConfig.delete(`/api/doctor/unlock/${id}`);
}
