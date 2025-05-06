import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
    const token = request.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/stylist/:path*', '/customer/:path*'], // مسیرهای پنل آرایشگر و مشتری
};