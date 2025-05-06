import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function POST() {
    try {
        const headers = {
            'Set-Cookie': cookie.serialize('token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/',
            }),
        };
        return NextResponse.json({ message: 'خروج با موفقیت انجام شد' }, { status: 200, headers });
    } catch (error) {
        return NextResponse.json({ message: 'خطا در خروج' }, { status: 500 });
    }
}