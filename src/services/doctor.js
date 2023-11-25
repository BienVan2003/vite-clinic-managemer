import axiosConfig from './axiosConfig'

export const apiDoctorList = () => {
    return axiosConfig.get("/api/doctor");
}

export const apiGetDoctorId = (id) => {
    return axiosConfig.get(`/api/doctor/${id}`);
}

export const apiEditDoctor = (id, doctor) => {
    return axiosConfig.put(`/api/doctor/update/${id}`, doctor);
}

export const apiDeleteDoctor = (id) => {
    return axiosConfig.delete(`/api/doctor/delete/${id}`);
}