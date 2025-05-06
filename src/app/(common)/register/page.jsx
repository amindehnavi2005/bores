"use client";
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('رمز عبور و تکرار آن مطابقت ندارند');
            return;
        }
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, phone, password }),
        });
        if (response.ok) {
            router.push('/login');
        } else {
            alert('ثبت‌نام ناموفق');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-lavender">ثبت‌نام</h1>
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
                    className="bg-mint hover:bg-mint-dark"
                >
                    ثبت‌نام
                </Button>
            </form>
        </div>
    );
};

export default RegisterPage;