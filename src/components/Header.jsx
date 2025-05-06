"use client"
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';
import { Menu, MenuItem, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <header className="bg-blue-600 text-white p-4">
            <nav className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex space-x-4">
                    <Link href="/" className="hover:underline">صفحه اصلی</Link>
                    <Link href="/appointments" className="hover:underline">لیست نوبت‌ها</Link>
                    <Link href="/about" className="hover:underline">درباره ما</Link>
                    <Link href="/contact" className="hover:underline">تماس با ما</Link>
                </div>
                {user ? (
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>پروفایل</MenuItem>
                            <MenuItem onClick={logout}>خروج</MenuItem>
                        </Menu>
                    </div>
                ) : (
                    <div className="flex space-x-4">
                        <Link href="/login" className="px-4 py-2">ورود</Link>
                        <Link href="/register" className="px-4 py-2">ثبت‌نام</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;