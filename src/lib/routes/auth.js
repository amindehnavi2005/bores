import Cookies from "js-cookie";
import api from "./axiosInterceptor";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const register = async (data) => {
    const response = await api.post(`${BASE_URL}/register`, data);
    return response.data;
};

export const login = async (data) => {
    const response = await api.post(`${BASE_URL}/login`, data);
    if (response.data.token) {
        Cookies.set('token', response.data.token);
        Cookies.set('expires_in', response.data.expires_in || Date.now() + 86400000);
    }
    return response.data;
};

export const me = async () => {
    const response = await api.get(`${BASE_URL}/me`, { requiresAuth: true });
    if (response.data.token) {
        Cookies.set('token', response.data.token);
        Cookies.set('expires_in', response.data.expires_in || Date.now() + 86400000);
    }
    return response;
};

export const logout = async () => {
    Cookies.remove('token');
    Cookies.remove('expires_in');
    return { message: 'خروج با موفقیت انجام شد' };
};