import axiosConfig from './axiosConfig'

export const apiPatientList = () => {
    return axiosConfig.get("/api/patient");
}

export const apiGetPatientId = (id) => {
    return axiosConfig.get(`/api/patient/${id}`);
}

export const apiAddPatient = (patient) => {
    return axiosConfig.post(`/api/patient/add`, patient);
}

export const apiEditPatient = (id, patient) => {
    return axiosConfig.put(`/api/patient/update/${id}`, patient);
}

export const apiDeletePatient = (id) => {
    return axiosConfig.delete(`/api/patient/delete/${id}`);
}

export const apiGetRecord = () => {
    return axiosConfig.get(`/api/patient/record`);
}

export const apiAddRecord = (record) => {
    return axiosConfig.post(`/api/patient/record/add`, record);
}