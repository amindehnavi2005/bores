import Cookies from "js-cookie";
import api from "./axiosInterceptor";

export const register = async (data) => {
    const response = await api.post('/register', data);
    return response.data;
};

export const login = async (data) => {
    const response = await api.post('/login', data);
    if (response.data.token) {
        Cookies.set('token', response.data.token);
        Cookies.set('expires_in', response.data.expires_in || Date.now() + 86400000);
    }
    return response.data;
};

export const logout = async () => {
    Cookies.remove('token');
    Cookies.remove('expires_in');
    return { message: 'خروج با موفقیت انجام شد' };
};