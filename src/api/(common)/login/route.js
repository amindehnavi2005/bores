import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import connectMongoDB from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        // اعتبارسنجی ورودی‌ها
        if (!username || !password) {
            return NextResponse.json({ message: 'نام کاربری و رمز عبور الزامی هستند' }, { status: 400 });
        }

        // اتصال به MongoDB
        await connectMongoDB();

        // بررسی وجود کاربر
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ message: 'نام کاربری یا رمز عبور اشتباه است' }, { status: 401 });
        }

        // بررسی رمز عبور
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'نام کاربری یا رمز عبور اشتباه است' }, { status: 401 });
        }

        // تولید توکن JWT
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // ذخیره توکن در کوکی
        const headers = {
            'Set-Cookie': cookie.serialize('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 86400, // 1 روز
                sameSite: 'strict',
                path: '/',
            }),
        };

        return NextResponse.json(
            { message: 'ورود با موفقیت انجام شد', user: { username: user.username, phone: user.phone } },
            { status: 200, headers }
        );
    } catch (error) {
        return NextResponse.json({ message: 'خطا در ورود' }, { status: 500 });
    }
}