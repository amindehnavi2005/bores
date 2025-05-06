"use client";
import Cookies from 'js-cookie';
import { logout } from '@/lib/routes/auth';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            // فرضاً اطلاعات کاربر از توکن یا API دریافت می‌شود
            setUser({ username: 'user' }); // باید با API واقعی جایگزین شود
            setRole('customer'); // باید با API واقعی جایگزین شود
        }
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