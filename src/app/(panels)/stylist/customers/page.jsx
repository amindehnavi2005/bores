"use client";
import { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import api from '@/lib/routes/axiosInterceptor';
import useCustomTable from '@/hooks/useCustomTable';

const CustomerListPage = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await api.get('/stylist/customers', { requiresAuth: true });
            setCustomers(response.data);
        } catch (error) {
            // خطاها توسط Interceptor مدیریت می‌شوند
        }
    };

    const columns = [
        { accessorKey: 'name', header: 'نام' },
        { accessorKey: 'phone', header: 'تلفن' },
        { accessorKey: 'email', header: 'ایمیل' },
        { accessorKey: 'address', header: 'آدرس' },
    ];

    const table = useCustomTable(columns, customers, {
        isLoading: false,
    });

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-lavender">لیست مشتریان</h1>
            <MaterialReactTable table={table} />
        </div>
    );
};

export default CustomerListPage;