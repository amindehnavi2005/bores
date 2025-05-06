import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { login } from '@/lib/routes/auth';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login: setUser } = useContext(AuthContext);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login({ username, password });
            setUser(data.user, data.user.role || 'customer');
            router.push('/');
        } catch (error) {
            // خطاها توسط Interceptor مدیریت می‌شوند
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-lavender">ورود</h1>
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
                    label="رمز عبور"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    ورود
                </Button>
            </form>
        </div>
    );
};

export default LoginPage;