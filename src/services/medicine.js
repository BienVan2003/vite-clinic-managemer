import axiosConfig from './axiosConfig'

export const apiMedicineList = () => {
    return axiosConfig.get("/api/medicine");
}

export const apiGetMedicineId = (id) => {
    return axiosConfig.get(`/api/medicine/${id}`);
}

export const apiAddMedicine = (medicine) => {
    return axiosConfig.post(`/api/medicine/add`, medicine);
}

export const apiEditMedicine = (id, medicine) => {
    return axiosConfig.put(`/api/medicine/update/${id}`, medicine);
}

export const apiDeleteMedicine = (id) => {
    return axiosConfig.delete(`/api/medicine/delete/${id}`);
}