"use client";
import Link from 'next/link';
import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { UserDropdown } from './UserDropdown';
import { usePathname } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const pathname = usePathname();
    const { user } = useContext(AuthContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

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
                <div className={`flex-col md:flex md:flex-row md:space-x-4 ${mobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:static top-16 left-0 w-full md:w-auto bg-primary md:bg-transparent p-4 md:p-0`}>
                    <Link href="/" className={`hover:text-secondary ${pathname == "/" && "text-accent"} py-2 md:py-0`}>صفحه اصلی</Link>
                    <Link href="/appointments" className={`hover:text-secondary ${pathname == "/appointments" && "text-accent"} py-2 md:py-0`}>لیست نوبت‌ها</Link>
                    <Link href="/about" className={`hover:text-secondary ${pathname == "/about" && "text-accent"} py-2 md:py-0`}>درباره ما</Link>
                    <Link href="/contact" className={`hover:text-secondary ${pathname == "/contact" && "text-accent"} py-2 md:py-0`}>تماس با ما</Link>
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