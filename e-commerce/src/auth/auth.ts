'use server'

import bcrypt from 'bcrypt'
import { FormState, RegisterFormValues, User} from '@/lib/types'
import { createSession,deleteSession } from './session'
import { sql } from '@vercel/postgres';

export const loginServer = async(email:string,password:string): Promise<FormState> => {
    const result = await sql<User>`
    SELECT * FROM users
    WHERE email = ${email}
    `

    const user = result.rows[0];
    if (!user) {
        return {message: 'could not find the user'};
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    )

    if(!passwordMatch){
        return {message: 'invalid credits'}
    }

    const result2 = await sql<User>`
    SELECT id,name,email,country 
    FROM users
    WHERE email = ${email}
    `

    const userWithoutPassword = result2.rows[0];
    await createSession(user)
    return {user: userWithoutPassword};
}

export const signup = async(data: RegisterFormValues):Promise<FormState> => {
    const {name,email,password,country} = data;
    const existingUser = await sql<User>`SELECT * FROM users WHERE email = ${email}`;

    if (existingUser.rows.length > 0) {
        return { message: 'User already exists via this email..' };
      }

    const hashedPassword = await bcrypt.hash(password,10);
    
    const result = await sql<User>`INSERT INTO users (name, email, password, country) 
    VALUES (${name}, ${email}, ${hashedPassword}, ${country}) RETURNING *;`;

    if(!result){
        return{ message: 'Error while inserting data to database!'}
    }
}

export async function logoutServer() {
    deleteSession();
  }