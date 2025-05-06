import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';

export async function POST(request) {
    console.log('API route called');
    try {
        const { username, phone, password } = await request.json();

        // اعتبارسنجی ورودی‌ها
        if (!username || !phone || !password) {
            return NextResponse.json({ message: 'تمامی فیلدها الزامی هستند' }, { status: 400 });
        }

        // اتصال به MongoDB
        await connectMongoDB();

        // بررسی وجود کاربر
        const userExists = await User.findOne({ $or: [{ username }, { phone }] });
        if (userExists) {
            return NextResponse.json({ message: 'کاربر یا شماره تلفن قبلاً ثبت شده است' }, { status: 400 });
        }

        // هش کردن رمز عبور
        const hashedPassword = await bcrypt.hash(password, 10);

        // ایجاد کاربر جدید
        const newUser = new User({ username, phone, password: hashedPassword });
        await newUser.save();

        return NextResponse.json({ message: 'ثبت‌نام با موفقیت انجام شد' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'خطا در ثبت‌نام' }, { status: 500 });
    }
}