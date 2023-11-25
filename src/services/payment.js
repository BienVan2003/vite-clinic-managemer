import axiosConfig from './axiosConfig'

export const apiCreatePayment = (payment) => {
    return axiosConfig.post("/api/payment/create", payment);
}

