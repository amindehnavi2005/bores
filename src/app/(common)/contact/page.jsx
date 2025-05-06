"use client";
import { useState } from 'react';
import { TextField, Button } from '@mui/material';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, email, message });
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-primary">تماس با ما</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    label="نام"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="ایمیل"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="پیام"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    multiline
                    rows={4}
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
                    ارسال
                </Button>
            </form>
            <div className="mt-8 text-center text-sm sm:text-base text-gray-700">
                <p>شماره تلفن: 021-12345678</p>
                <p>ایمیل: info@salon.com</p>
                <p>آدرس: تهران، خیابان مرکزی، پلاک 123</p>
            </div>
        </div>
    );
};

export default ContactPage;