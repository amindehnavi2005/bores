import jwt from 'jsonwebtoken';
import User from '@/models/User';
import connectMongoDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        // دریافت کوکی‌ها از درخواست
        const cookies = request.headers.get('cookie');
        if (!cookies) {
            return NextResponse.json({ message: 'توکن یافت نشد' }, { status: 401 });
        }

        // استخراج توکن از کوکی
        const parsedCookies = Object.fromEntries(
            cookies.split('; ').map(cookie => cookie.split('='))
        );
        const token = parsedCookies.token;

        if (!token) {
            return NextResponse.json({ message: 'توکن یافت نشد' }, { status: 401 });
        }

        // بررسی توکن JWT
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return NextResponse.json({ message: 'توکن نامعتبر است' }, { status: 401 });
        }

        // اتصال به MongoDB
        await connectMongoDB();

        // دریافت اطلاعات کاربر از دیتابیس
        const user = await User.findById(decodedToken.id).select('-password'); // حذف رمز عبور از نتیجه
        if (!user) {
            return NextResponse.json({ message: 'کاربر یافت نشد' }, { status: 404 });
        }

        // ارسال اطلاعات کاربر
        return NextResponse.json(
            { message: 'اطلاعات کاربر با موفقیت دریافت شد', user },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ message: 'خطا در دریافت اطلاعات کاربر' }, { status: 500 });
    }
}