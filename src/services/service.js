import axiosConfig from './axiosConfig'

export const apiServiceList = () => {
    return axiosConfig.get("/api/service");
}

export const apiGetServiceId = (id) => {
    return axiosConfig.get(`/api/service/${id}`);
}

export const apiAddService = (service) => {
    return axiosConfig.post(`/api/service/add`, service);
}

export const apiEditService = (id, service) => {
    return axiosConfig.put(`/api/service/update/${id}`, service);
}

export const apiDeleteService = (id) => {
    return axiosConfig.delete(`/api/service/delete/${id}`);
}