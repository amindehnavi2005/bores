"use client";
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';
import 'moment-jalaali';
import { Button, Dialog, DialogTitle, DialogContent, TextField, Select, MenuItem } from '@mui/material';
import api from '@/lib/routes/axiosInterceptor';
import { MaterialReactTable } from 'material-react-table';
import { Add } from '@mui/icons-material';

moment.updateLocale('fa', {
    week: {
        dow: 6,
        doy: 12,
    },
});

const SubmitAppointmentPage = () => {
    const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week'));
    const [selectedDate, setSelectedDate] = useState(moment().startOf('day'));
    const [appointments, setAppointments] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        date: selectedDate.format('jYYYY/jMM/jDD'),
        time: '',
        service: '',
    });
    const [services, setServices] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);

    useEffect(() => {
        fetchAppointments();
        fetchServices();
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

    const handleAddAppointment = () => {
        setFormData({
            customerName: '',
            date: selectedDate.format('jYYYY/jMM/jDD'),
            time: '',
            service: '',
        });
        setOpenDialog(true);
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
            const gregorianDate = moment(formData.date, 'jYYYY/jMM/jDD').toDate();
            const appointmentData = {
                customerName: formData.customerName,
                date: gregorianDate.toISOString(),
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
        const day = currentWeekStart.clone().add(i, 'days');
        weekDays.push(day);
    }

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-lavender">ثبت نوبت</h1>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <Button onClick={() => setCurrentWeekStart(currentWeekStart.clone().subtract(7, 'days'))} className="mb-2 sm:mb-0">هفته قبل</Button>
                <div className="flex flex-wrap justify-center gap-2">
                    {weekDays.map(day => (
                        <Button
                            key={day.format('jYYYY/jMM/jDD')}
                            variant={day.isSame(selectedDate, 'day') ? 'contained' : 'outlined'}
                            onClick={() => setSelectedDate(day)}
                            style={{borderRadius: '50px'}}
                            className={day.isSame(selectedDate, 'day') ? 'bg-mint' : 'bg-periwinkle'}
                        >
                            {day.format('dddd DD')}
                        </Button>
                    ))}
                </div>
                <Button onClick={() => setCurrentWeekStart(currentWeekStart.clone().add(7, 'days'))} className="mt-2 sm:mt-0">هفته بعد</Button>
            </div>
            <MaterialReactTable
                renderTopToolbarCustomActions={({ table }) => (
                    <Button onClick={handleAddAppointment} variant='contained' style={{ borderRadius: '50px' }} className="mt-4 bg-mint hover:bg-mint-dark gap-2 rounded-full"><Add /><span>افزودن نوبت جدید</span>
                    </Button>
                )}
                columns={[
                    { accessorKey: 'time', header: 'ساعت' },
                    { accessorKey: 'service.name', header: 'خدمت' },
                    { accessorKey: 'customerName', header: 'مشتری' },
                    { accessorKey: 'status', header: 'وضعیت' },
                ]}
                data={appointments}
            />
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>ثبت نوبت جدید</DialogTitle>
                <DialogContent>
                    <TextField
                        label="نام مشتری"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="تاریخ"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        fullWidth
                        margin="normal"
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
                    <TextField
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
                    </TextField>
                    <Button onClick={handleSubmit} className="mt-4 bg-mint hover:bg-mint-dark">ثبت</Button>
                    <Button onClick={() => setOpenDialog(false)} className="mt-4 ml-2">انصراف</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SubmitAppointmentPage;