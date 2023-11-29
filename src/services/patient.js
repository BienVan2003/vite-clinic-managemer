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

export const apiLockPatient = (id) => {
    return axiosConfig.delete(`/api/patient/lock/${id}`);
}

export const apiUnlockPatient = (id) => {
    return axiosConfig.delete(`/api/patient/unlock/${id}`);
}

export const apiGetRecord = () => {
    return axiosConfig.get(`/api/patient/record`);
}

export const apiGetRecordByPatient = (id) => {
    return axiosConfig.get(`/api/patient/record/${id}`);
}

export const apiGetRecordByAppointment = (id) => {
    return axiosConfig.get(`/api/patient/record/appointment/${id}`);
}

export const apiAddRecord = (record) => {
    return axiosConfig.post(`/api/patient/record/create`, record);
}

export const apiForgotPassword = (email) => {
    return axiosConfig.post(`/api/patient/forgot-password?email=${email}`);
}

export const apiResetPassword = (payload) => {
    return axiosConfig.post(`/api/patient/reset-password`, payload);
}

export const apiChangePassword = (payload) => {
    return axiosConfig.post(`/api/patient/change-password`, payload);
}

export const apiEditProfile = (payload) => {
    return axiosConfig.put(`/api/patient/edit-profile`, payload);
}