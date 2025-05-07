import jwt from 'jsonwebtoken';
import Employee from '@/models/Employee';
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';

export async function GET(request) {
    try {
        await connectMongoDB();
        const token = request.cookies.get('token')?.value;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const employees = await Employee.find({ stylistId: decoded.id });
        return NextResponse.json(employees);
    } catch (error) {
        return NextResponse.json({ message: 'خطا در دریافت کارکنان' }, { status: 500 });
    }
}