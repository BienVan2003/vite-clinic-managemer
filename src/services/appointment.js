import axiosConfig from './axiosConfig'

export const apiAppointmentList = () => {
    return axiosConfig.get("/api/appointment");
}

export const apiAppointmentDoctorWeek = ({ doctorId, start, end }) => {
    return axiosConfig.get(`/api/appointment/doctor-week?doctorId=${doctorId}&start=${start}&end=${end}`);
}

export const apiAppointmentPatientWeek = ({ patientId, start, end }) => {
    return axiosConfig.get(`/api/appointment/patient-week?patientId=${patientId}&start=${start}&end=${end}`);
}

export const apiAppointmentWeek = ({ start, end }) => {
    return axiosConfig.get(`/api/appointment/week?start=${start}&end=${end}`);
}

export const apiAppointmentNoneRecordByPatient = (id) => {
    return axiosConfig.get("/api/appointment/not-record/" + id);
}

export const apiAppointmentsByUsername = () => {
    return axiosConfig.get("/api/appointment/username");
}

export const apiGetAppointmentId = (id) => {
    return axiosConfig.get(`/api/appointment/${id}`);
}

export const apiGetAppointmentPatientId = (id) => {
    return axiosConfig.get(`/api/appointment/patient/${id}`);
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