import axiosConfig from './axiosConfig'

export const apiSearchDoctor = (query) => {
    return axiosConfig.get(`/api/search/doctor?query=${encodeURIComponent(query)}`);
}

export const apiSearchPatient = (query) => {
    return axiosConfig.get(`/api/search/patient?query=${encodeURIComponent(query)}`);
}

export const apiSearchService = (query) => {
    return axiosConfig.get(`/api/search/service?query=${encodeURIComponent(query)}`);
}

export const apiSearchMedicine = (query) => {
    return axiosConfig.get(`/api/search/medicine?query=${encodeURIComponent(query)}`);
}

export const apiSearchAppointmentByDoctor = (query) => {
    return axiosConfig.get(`/api/search/appointment/doctor?query=${encodeURIComponent(query)}`);
}

export const apiSearchAppointmentByPatient = (query) => {
    return axiosConfig.get(`/api/search/appointment/patient?query=${encodeURIComponent(query)}`);
}

export const apiSearchPrescriptionByPatient = (query) => {
    return axiosConfig.get(`/api/search/prescription/patient?query=${encodeURIComponent(query)}`);
}

export const apiSearchRecordByPatient = (query) => {
    return axiosConfig.get(`/api/search/record/patient?query=${encodeURIComponent(query)}`);
}