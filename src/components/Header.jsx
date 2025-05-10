"use client";
import Link from 'next/link';
import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { UserDropdown } from './UserDropdown';
import { usePathname } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

const Header = () => {
    const pathname = usePathname();
    const { user, role } = useContext(AuthContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // منوی پیش‌فرض برای کاربران مهمان
    const defaultMenuItems = [
        { title: 'صفحه اصلی', path: '/' },
        { title: 'درباره ما', path: '/about' },
        { title: 'تماس با ما', path: '/contact' },
    ];

    // منوی مخصوص آرایشگر
    const stylistMenuItems = [
        { title: 'صفحه اصلی', path: '/' },
        { title: 'ثبت نوبت', path: '/stylist/submit-appointment' },
        { title: 'مشتریان', path: '/stylist/customers' },
        { title: 'کارمندان', path: '/stylist/employees' },
    ];

    // منوی مخصوص مشتری
    const customerMenuItems = [
        { title: 'صفحه اصلی', path: '/' },
        { title: 'نوبت‌های من', path: '/customer/appointments' },
        { title: 'رزرو نوبت', path: '/customer/book-appointment' },
        { title: 'پروفایل', path: '/customer/profile' },
    ];

    // انتخاب منوی مناسب بر اساس نقش کاربر
    const getMenuItems = () => {
        if (!user) return defaultMenuItems;
        switch (role) {
            case 'stylist':
                return stylistMenuItems;
            case 'customer':
                return customerMenuItems;
            default:
                return defaultMenuItems;
        }
    };

    const menuItems = getMenuItems();

    return (
        <header className="bg-primary text-white p-4">
            <nav className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Hamburger menu for mobile */}
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-white text-2xl">
                        ☰
                    </button>
                </div>
                {/* Navigation links */}
                <div className={`z-10 flex-col md:flex md:flex-row md:space-x-4 ${mobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:static top-16 left-0 w-full md:w-auto bg-primary md:bg-transparent p-4 md:p-0`}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`hover:text-secondary ${pathname === item.path ? "text-accent" : ""} py-2 md:py-0`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
                {/* User menu */}
                <div>
                    {user ? (
                        <UserDropdown user={user} />
                    ) : (
                        <Button className="text-center rounded-full" variant='contained' color='error'>
                            <Link href={"/login"}>ورود / ثبت نام</Link>
                        </Button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;