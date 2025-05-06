import api from "./axiosInterceptor";

export const register = async (data) => {
    const response = await api.post('/register', data);
    return response.data;
};

export const login = async (data) => {
    const response = await api.post('/login', data);
    if (typeof window !== 'undefined' && response.data.token) {
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('expires_in', response.data.expires_in || Date.now() + 86400000);
    }
    return response.data;
};

export const logout = async () => {
    if (typeof window !== 'undefined') {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('expires_in');
    }
    return { message: 'خروج با موفقیت انجام شد' };
};