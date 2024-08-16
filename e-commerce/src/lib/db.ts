import { sql } from '@vercel/postgres';
import {User} from './types'

export async function fetchUsers(): Promise<User[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve,1500))
    const data = await sql<User>`SELECT * FROM users`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users');
  }
}
