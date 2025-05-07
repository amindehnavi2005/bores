"use client";
import Cookies from 'js-cookie';
import { logout, me } from '@/lib/routes/auth';
import { createContext, useState, useEffect } from 'react';
import api from '@/lib/routes/axiosInterceptor';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    const fetchUser = async () => {
        const token = Cookies.get('token');
        if (token) {
            const user = await me();
            setUser({ username: user?.data?.user?.username });
            setRole('customer');
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const login = (userData, userRole) => {
        setUser(userData);
        setRole(userRole);
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
        setRole(null);
        Cookies.remove('token');
        Cookies.remove('expires_in');
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};