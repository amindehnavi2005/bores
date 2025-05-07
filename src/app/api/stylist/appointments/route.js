import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Appointment from '@/models/Appointment';
import jwt from 'jsonwebtoken';

export async function GET(request) {
    try {
        await connectMongoDB();
        const token = request.cookies.get('token')?.value;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');
        const appointments = await Appointment.find({ stylistId: decoded.id, date });
        return NextResponse.json(appointments);
    } catch (error) {
        return NextResponse.json({ message: 'خطا در دریافت نوبت‌ها' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectMongoDB();
        const token = request.cookies.get('token')?.value;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const data = await request.json();
        const newAppointment = new Appointment({ ...data, stylistId: decoded.id });
        await newAppointment.save();
        return NextResponse.json({ message: 'نوبت با موفقیت ثبت شد' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'خطا در ثبت نوبت' }, { status: 500 });
    }
}