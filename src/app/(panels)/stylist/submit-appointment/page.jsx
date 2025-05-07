"use client";
import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment-jalaali';
import { Button, Dialog, DialogTitle, DialogContent, TextField, Select, MenuItem, Box, IconButton } from '@mui/material';
import api from '@/lib/routes/axiosInterceptor';
import { Add, Close } from '@mui/icons-material';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Autocomplete from '@mui/material/Autocomplete';
import useCustomTable from '@/hooks/useCustomTable';
import { MaterialReactTable } from 'material-react-table';

moment.locale('fa');

const SubmitAppointmentPage = () => {
    const [currentWeekStart, setCurrentWeekStart] = useState(moment().locale('fa').startOf('week'));
    const [selectedDate, setSelectedDate] = useState(moment().locale('fa').startOf('day'));
    const [appointments, setAppointments] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        customerId: null,
        date: selectedDate.format('jYYYY/jMM/jDD'),
        time: '',
        service: '',
    });
    const [services, setServices] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchAppointments();
        fetchServices();
        fetchCustomers();
    }, [selectedDate]);

    const fetchAppointments = async () => {
        try {
            const response = await api.get(`/api/stylist/appointments?date=${selectedDate.format('jYYYY/jMM/jDD')}`, { requiresAuth: true });
            setAppointments(response.data);
        } catch (error) {
            // خطاها توسط Interceptor مدیریت می‌شوند
        }
    };

    const fetchServices = async () => {
        try {
            const response = await api.get('/api/stylist/services', { requiresAuth: true });
            setServices(response.data);
        } catch (error) {
            // خطاها توسط Interceptor مدیریت می‌شوند
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await api.get('/api/stylist/customers', { requiresAuth: true });
            setCustomers(response.data);
        } catch (error) {
            // خطاها توسط Interceptor مدیریت می‌شوند
        }
    };

    const handleAddAppointment = () => {
        setFormData({
            customerId: null,
            date: selectedDate.format('jYYYY/jMM/jDD'),
            time: '',
            service: '',
        });
        setOpenDialog(true);
    };

    const handleDateChange = (date) => {
        const formattedDate = date ? date.format('YYYY/MM/DD') : selectedDate.format('jYYYY/jMM/jDD');
        setFormData({ ...formData, date: formattedDate });
    };

    const handleServiceChange = async (event) => {
        const serviceId = event.target.value;
        const service = services.find(s => s.id === serviceId);
        if (service) {
            try {
                const response = await api.get(`/api/stylist/available-times?date=${formData.date}&duration=${service.duration}`, { requiresAuth: true });
                setAvailableTimes(response.data);
            } catch (error) {
                // خطاها توسط Interceptor مدیریت می‌شوند
            }
        } else {
            setAvailableTimes([]);
        }
        setFormData({ ...formData, service: serviceId });
    };

    const handleSubmit = async () => {
        try {
            const timestamp = moment(formData.date, 'jYYYY/jMM/jDD').unix();
            const appointmentData = {
                customerId: formData.customerId,
                date: timestamp,
                time: formData.time,
                serviceId: formData.service,
            };
            await api.post('/api/stylist/appointments', appointmentData, { requiresAuth: true });
            setOpenDialog(false);
            fetchAppointments();
        } catch (error) {
            // خطاها توسط Interceptor مدیریت می‌شوند
        }
    };

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        const day = currentWeekStart.clone().locale('fa').add(i, 'days');
        weekDays.push(day);
    }

    const columns = [
        { accessorKey: 'time', header: 'ساعت' },
        { accessorKey: 'service.name', header: 'خدمت' },
        {
            accessorKey: 'customerName',
            header: 'مشتری',
            Cell: ({ cell }) => cell.getValue() || 'آزاد',
        },
        { accessorKey: 'status', header: 'وضعیت' },
        {
            accessorKey: 'date',
            header: 'تاریخ',
            Cell: ({ cell }) => moment.unix(cell.getValue()).format('jYYYY/jMM/jDD'),
        },
    ];

    const table = useCustomTable(columns, appointments, {
        isLoading: false,
        renderTopToolbarCustomActions: ({ table }) => (
            <Button onClick={handleAddAppointment} variant='contained' style={{ borderRadius: '50px' }} className="mt-4 bg-mint hover:bg-mint-dark gap-2 rounded-full"><Add /><span>افزودن نوبت جدید</span>
            </Button>
        )
    });

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-lavender">ثبت نوبت</h1>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <Button onClick={() => setCurrentWeekStart(currentWeekStart.clone().subtract(7, 'days'))} variant='contained' style={{ borderRadius: "50px" }} className="mb-2 sm:mb-0">هفته قبل</Button>
                <div className="flex flex-wrap justify-center gap-2">
                    {weekDays.map(day => (
                        <Button
                            key={day.format('jYYYY/jMM/jDD')}
                            variant={day.isSame(selectedDate, 'day') ? 'contained' : 'outlined'}
                            onClick={() => setSelectedDate(day)}
                            style={{ borderRadius: '50px' }}
                            className={day.isSame(selectedDate, 'day') ? 'bg-mint' : 'bg-periwinkle'}
                        >
                            {day.format('dddd DD')}
                        </Button>
                    ))}
                </div>
                <Button onClick={() => setCurrentWeekStart(currentWeekStart.clone().add(7, 'days'))} variant='contained' style={{ borderRadius: "50px" }} className="mt-2 sm:mt-0">هفته بعد</Button>
            </div>
            <MaterialReactTable table={table} />
            <Dialog open={openDialog} fullWidth>
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                    <IconButton onClick={() => setOpenDialog(false)} size="small" style={{ borderRadius: '50%' }}>
                        <Close />
                    </IconButton>
                    <DialogTitle>ثبت نوبت جدید</DialogTitle>
                </Box>
                <DialogContent className='grid gap-5'>
                    <Autocomplete
                        options={customers}
                        getOptionLabel={(option) => option.name}
                        value={formData.customerId ? customers.find(c => c.id === formData.customerId) : null}
                        onChange={(event, newValue) => setFormData({ ...formData, customerId: newValue ? newValue.id : null })}
                        renderInput={(params) => <TextField {...params} label="نام مشتری" />}
                        includeInputInList
                    />
                    <DatePicker
                        value={formData.date}
                        onChange={handleDateChange}
                        calendar={persian}
                        locale={persian_fa}
                        style={{ width: '100%' }}
                        format="YYYY/MM/DD"
                        inputClassName="w-full p-2 border rounded text-base"
                        calendarClassName="w-full max-w-md bg-white shadow-lg rounded"
                    />
                    <Select
                        label="خدمت"
                        value={formData.service}
                        onChange={handleServiceChange}
                        fullWidth
                        margin="normal"
                    >
                        {services.map(service => (
                            <MenuItem key={service.id} value={service.id}>{service.name}</MenuItem>
                        ))}
                    </Select>
                    {/* <TextField
                        label="ساعت"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        fullWidth
                        margin="normal"
                        select
                        SelectProps={{ multiple: false }}
                    >
                        {availableTimes.map(time => (
                            <MenuItem key={time} value={time}>{time}</MenuItem>
                        ))}
                    </TextField> */}
                    <Button onClick={handleSubmit} variant="contained" style={{ marginTop: "5%" }} className="mt-4 bg-mint hover:bg-mint-dark">ثبت</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SubmitAppointmentPage;