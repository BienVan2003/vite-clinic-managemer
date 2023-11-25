import axiosConfig from './axiosConfig'

export const apiAppointmentList = () => {
    return axiosConfig.get("/api/appointment");
}

export const apiAppointmentsByUsername = () => {
    return axiosConfig.get("/api/appointment/username");
}

export const apiGetAppointmentId = (id) => {
    return axiosConfig.get(`/api/appointment/${id}`);
}

export const apiAddAppointment = (appointment) => {
    return axiosConfig.post(`/api/appointment/add`, appointment);
}

export const apiEditAppointment = (id, appointment) => {
    return axiosConfig.put(`/api/appointment/update/${id}`, appointment);
}

export const apiDeleteAppointment = (id) => {
    return axiosConfig.delete(`/api/appointment/delete/${id}`);
}

export const apiCheckAppointment = (appointment) => {
    return axiosConfig.post(`/api/appointment/check`, appointment);
}