import axiosConfig from './axiosConfig'

export const apiClinicList = () => {
    return axiosConfig.get("/api/clinic");
}

export const apiGetClinicId = (id) => {
    return axiosConfig.get(`/api/clinic/${id}`);
}

export const apiAddClinic = (clinic) => {
    return axiosConfig.post(`/api/clinic/add`, clinic);
}

export const apiEditClinic = (id, clinic) => {
    return axiosConfig.put(`/api/clinic/update/${id}`, clinic);
}

export const apiDeleteClinic = (id) => {
    return axiosConfig.delete(`/api/clinic/delete/${id}`);
}