import { NextResponse } from 'next/server';
import { verifySession } from '@/auth/session';

export async function GET() {
  const sessionData = await verifySession();

  console.log('server sessionData',sessionData);

  if (!sessionData) {
    return NextResponse.json({ error: 'Session cookie not found' }, { status: 404 });
  }

  const filteredData = {
    id: sessionData.userId,
    name: sessionData.name,
    email: sessionData.email,
    country: sessionData.country,
    isAdmin: sessionData.isAdmin
  }

  return NextResponse.json(filteredData);
}
