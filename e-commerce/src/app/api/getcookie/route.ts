import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/auth/session';

export async function GET(req: NextRequest) {
    try {
        const cookie = req.cookies.get('session')?.value; 
        if (!cookie) {
            return NextResponse.json({ error: 'Session cookie missing' }, { status: 401 });
        }

        const session = await decrypt(cookie);  

        if (session) {
            const { userId, name, email, country } = session;
            return NextResponse.json({ userId, name, email, country });
        } else {
            return NextResponse.json({ error: 'Session invalid or expired' }, { status: 401 });
        }
    } catch (error: any) {
        console.error('Error verifying session:', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
