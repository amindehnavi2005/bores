"use client";
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/routes/auth';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('رمز عبور و تکرار آن مطابقت ندارند');
            return;
        }
        try {
            await register({ username, phone, password });
            router.push('/login');
        } catch (error) {
            // خطاها توسط Interceptor مدیریت می‌شوند
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-primary">ثبت‌نام</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    label="نام کاربری"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="شماره تلفن"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="رمز عبور"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="تکرار رمز عبور"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="bg-secondary hover:bg-secondary-dark"
                >
                    ثبت‌نام
                </Button>
            </form>
        </div>
    );
};

export default RegisterPage;