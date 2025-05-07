import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Appointment from '@/models/Appointment';
import Stylist from '@/models/Stylist';
import jwt from 'jsonwebtoken';

export async function GET(request) {
    try {
        await connectMongoDB();
        const token = request.cookies.get('token')?.value;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');
        const duration = parseInt(searchParams.get('duration'));

        const stylist = await Stylist.findById(decoded.id);
        const dayOfWeek = moment(date, 'jYYYY/jMM/jDD').locale('fa').format('dddd');
        const workingHours = stylist.workingHours.find(wh => wh.day === dayOfWeek)?.slots || [];

        const appointments = await Appointment.find({ stylistId: decoded.id, date });
        const bookedTimes = appointments.map(appt => ({
            start: appt.time,
            end: moment(appt.time, 'HH:mm').add(appt.service.duration, 'minutes').format('HH:mm'),
        }));

        const availableTimes = [];
        workingHours.forEach(slot => {
            const [start, end] = slot.split('-');
            let current = moment(start, 'HH:mm');
            const endTime = moment(end, 'HH:mm');
            while (current.isBefore(endTime)) {
                const slotStart = current.format('HH:mm');
                const slotEnd = current.clone().add(duration, 'minutes').format('HH:mm');
                const isBooked = bookedTimes.some(bt =>
                    (slotStart >= bt.start && slotStart < bt.end) ||
                    (slotEnd > bt.start && slotEnd <= bt.end)
                );
                if (!isBooked && current.clone().add(duration, 'minutes').isBefore(endTime)) {
                    availableTimes.push(slotStart);
                }
                current.add(30, 'minutes');
            }
        });

        return NextResponse.json(availableTimes);
    } catch (error) {
        return NextResponse.json({ message: 'خطا در دریافت زمان‌های خالی' }, { status: 500 });
    }
}