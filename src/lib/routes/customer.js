import api from './axios';

export const getCustomerAppointments = async () => {
    const response = await api.get('/customer/history', { requiresAuth: true });
    return response.data;
};

export const getPrices = async () => {
    const response = await api.get('/customer/prices', { requiresAuth: true });
    return response.data;
};

export const bookAppointment = async (data) => {
    const response = await api.post('/customer/book', data, { requiresAuth: true });
    return response.data;
};

export const updateSettings = async (data) => {
    const response = await api.put('/customer/settings', data, { requiresAuth: true });
    return response.data;
};