import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        if (config.requiresAuth) {
            const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                toast.error('احراز هویت موفقیت‌آمیز نبود');
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                toast.error('توکن شما منقضی شده است. لطفاً دوباره وارد شوید.');
                if (typeof window !== 'undefined') {
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('expires_in');
                    window.location.href = '/login';
                }
            } else if (error.response.data.errors) {
                const errors = error.response.data.errors;
                Object.keys(errors).forEach((key) => {
                    errors[key].forEach((message) => {
                        toast.error(message);
                    });
                });
            } else if (error.response.data.message) {
                toast.error(error.response.data.message);
            }
        } else {
            console.error(error);
            toast.error('خطای سیستمی');
        }
        return Promise.reject(error);
    }
);

export default api;