import axiosConfig from './axiosConfig'

export const apiShiftList = () => {
    return axiosConfig.get("/api/shift");
}

export const apiGetShiftId = (id) => {
    return axiosConfig.get(`/api/shift/${id}`);
}

export const apiAddShift = (shift) => {
    return axiosConfig.post(`/api/shift/add`, shift);
}

export const apiEditShift = (id, shift) => {
    return axiosConfig.put(`/api/shift/update/${id}`, shift);
}

export const apiDeleteShift = (id) => {
    return axiosConfig.delete(`/api/shift/delete/${id}`);
}