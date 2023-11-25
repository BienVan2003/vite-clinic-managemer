import axiosConfig from './axiosConfig'

export const apiPrescriptionList = () => {
    return axiosConfig.get("/api/prescription");
}

export const apiGetPrescriptionId = (id) => {
    return axiosConfig.get(`/api/prescription/${id}`);
}

export const apiAddPrescription = (prescription) => {
    return axiosConfig.post(`/api/prescription/add`, prescription);
}

export const apiEditPrescription = (id, prescription) => {
    return axiosConfig.put(`/api/prescription/update/${id}`, prescription);
}

export const apiDeletePrescription = (id) => {
    return axiosConfig.delete(`/api/prescription/delete/${id}`);
}