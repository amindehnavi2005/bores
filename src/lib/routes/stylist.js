import api from "./axiosInterceptor";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAppointments = async (date) => {
    const response = await api.get(`${BASE_URL}/stylist/appointments?date=${date}`, { requiresAuth: true });
    return response.data;
};

export const registerAppointment = async (data) => {
    const response = await api.post(`${BASE_URL}/stylist/appointments`, data, { requiresAuth: true });
    return response.data;
};

export const getIncome = async () => {
    const response = await api.get(`${BASE_URL}/stylist/income`, { requiresAuth: true });
    return response.data;
};

export const getEmployees = async () => {
    const response = await api.get(`${BASE_URL}/stylist/employees`, { requiresAuth: true });
    return response.data;
};

export const getCustomers = async () => {
    const response = await api.get(`${BASE_URL}/stylist/customers`, { requiresAuth: true });
    return response.data;
};

export const updateSettings = async (data) => {
    const response = await api.put(`${BASE_URL}/stylist/settings`, data, { requiresAuth: true });
    return response.data;
};