import axiosConfig from './axiosConfig'

export const apiPrescriptionList = () => {
    return axiosConfig.get("/api/prescription");
}

export const apiPrescriptionListByIdRecord = (id) => {
    return axiosConfig.get(`/api/prescription/record/${id}`);
}

export const apiGetPrescriptionId = (id) => {
    return axiosConfig.get(`/api/prescription/${id}`);
}

export const apiAddPrescription = (prescription) => {
    return axiosConfig.post(`/api/prescription/add`, prescription);
}

export const apiEditMedicineInPrescription = (id, prescription) => {
    return axiosConfig.put(`/api/prescription/update/medicine/${id}`, prescription);
}

export const apiAddMedicineInPrescription = (id, prescription) => {
    return axiosConfig.put(`/api/prescription/add/medicine/${id}`, prescription);
}

export const apiDeletePrescription = (id) => {
    return axiosConfig.delete(`/api/prescription/delete/${id}`);
}