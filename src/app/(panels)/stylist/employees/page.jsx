"use client";
import { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, Box, IconButton } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { MaterialReactTable } from 'material-react-table';
import api from '@/lib/routes/axiosInterceptor';
import useCustomTable from '@/hooks/useCustomTable';

const EmployeeListPage = () => {
    const [employees, setEmployees] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        phone: '',
        email: '',
        address: '',
    });

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

    const handleAddEmployee = () => {
        setFormData({
            name: '',
            position: '',
            phone: '',
            email: '',
            address: '',
        });
        setOpenDialog(true);
    };

    const handleSubmit = async () => {
        try {
            await api.post('/stylist/employees', formData, { requiresAuth: true });
            setOpenDialog(false);
            fetchEmployees();
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
        renderTopToolbarCustomActions: () => (
            <Button
                onClick={handleAddEmployee}
                variant="contained"
                style={{ borderRadius: '50px' }}
                className="bg-mint hover:bg-mint-dark gap-2 rounded-full"
            >
                <Add />
                <span>افزودن کارمند جدید</span>
            </Button>
        ),
    });

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-lavender">لیست کارکنان</h1>
            <MaterialReactTable {...table} />
            <Dialog open={openDialog}>
                <Box display="flex" justifyContent="space-between" alignItems="center" px={5} pt={2}>
                    <IconButton onClick={() => setOpenDialog(false)} size="small" style={{ borderRadius: '50%' }}>
                        <Close />
                    </IconButton>
                    <DialogTitle>افزودن کارمند جدید</DialogTitle>
                </Box>
                <DialogContent>
                    <TextField
                        label="نام"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="سمت"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="تلفن"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="ایمیل"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="آدرس"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <Button onClick={handleSubmit} variant="contained" className="mt-4 bg-mint hover:bg-mint-dark">ثبت</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EmployeeListPage;