import 'server-only';

import { cache } from 'react';
import { verifySession } from './session';
import { sql } from '@vercel/postgres';
import { User } from '@/lib/types';

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) {
    return null;
}

  try {
    const data = await sql<User>`
    SELECT *
    FROM users
    WHERE email = ${session.email}`

    const user = data.rows[0];

    return user;
  } catch (error) {
    console.log('Failed to fetch user');
    return null;
  }
});