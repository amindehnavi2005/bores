import api from './axios';

export const getAppointments = async () => {
    const response = await api.get('/stylist/appointments', { requiresAuth: true });
    return response.data;
};

export const registerAppointment = async (data) => {
    const response = await api.post('/stylist/appointments', data, { requiresAuth: true });
    return response.data;
};

export const getIncome = async () => {
    const response = await api.get('/stylist/income', { requiresAuth: true });
    return response.data;
};

export const getEmployees = async () => {
    const response = await api.get('/stylist/employees', { requiresAuth: true });
    return response.data;
};

export const getCustomers = async () => {
    const response = await api.get('/stylist/customers', { requiresAuth: true });
    return response.data;
};

export const updateSettings = async (data) => {
    const response = await api.put('/stylist/settings', data, { requiresAuth: true });
    return response.data;
};