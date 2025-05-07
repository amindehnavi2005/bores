"use client";
import { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import api from '@/lib/routes/axiosInterceptor';
import useCustomTable from '@/hooks/useCustomTable';

const EmployeeListPage = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await api.get('/stylist/employees', { requiresAuth: true });
            setEmployees(response.data);
        } catch (error) {
            // خطاها توسط Interceptor مدیریت می‌شوند
        }
    };

    const columns = [
        { accessorKey: 'name', header: 'نام' },
        { accessorKey: 'position', header: 'سمت' },
        { accessorKey: 'phone', header: 'تلفن' },
        { accessorKey: 'email', header: 'ایمیل' },
        { accessorKey: 'address', header: 'آدرس' },
    ];

    const table = useCustomTable(columns, employees, {
        isLoading: false,
    });

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-lavender">لیست کارکنان</h1>
            <MaterialReactTable table={table} />
        </div>
    );
};

export default EmployeeListPage;