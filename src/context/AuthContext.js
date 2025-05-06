"use client";
import { logout } from '@/lib/routes/auth';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
        const expiresIn = typeof window !== 'undefined' ? window.localStorage.getItem('expires_in') : null;
        if (token && expiresIn && Date.now() < parseInt(expiresIn)) {
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
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};