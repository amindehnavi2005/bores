"use client";
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';
import { Menu, MenuItem, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="bg-lavender text-white p-4">
            <nav className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Hamburger menu for mobile */}
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-white text-2xl">
                        ☰
                    </button>
                </div>
                {/* Navigation links */}
                <div className={`flex-col md:flex md:flex-row md:space-x-4 ${mobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:static top-16 left-0 w-full md:w-auto bg-lavender md:bg-transparent p-4 md:p-0`}>
                    <Link href="/" className="hover:underline py-2 md:py-0">صفحه اصلی</Link>
                    <Link href="/appointments" className="hover:underline py-2 md:py-0">لیست نوبت‌ها</Link>
                    <Link href="/about" className="hover:underline py-2 md:py-0">درباره ما</Link>
                    <Link href="/contact" className="hover:underline py-2 md:py-0">تماس با ما</Link>
                </div>
                {/* User menu */}
                <div>
                    {user ? (
                        <>
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
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>پروفایل</MenuItem>
                                <MenuItem onClick={() => { logout(); handleClose(); }}>خروج</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <div className="flex space-x-4">
                            <Link href="/login" className="px-4 py-2">ورود</Link>
                            <Link href="/register" className="px-4 py-2">ثبت‌نام</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;