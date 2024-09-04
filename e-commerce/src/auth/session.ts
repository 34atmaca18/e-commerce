import 'server-only'

import {SignJWT,jwtVerify} from 'jose'
import { cookies } from 'next/headers'
import { User,SessionPayload } from '@/lib/types'

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export const encrypt = async(payload:SessionPayload) => {
    return new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1hr')
        .sign(key)
    }

export const decrypt = async(session: string | undefined = '') => {
    if(!session){
        return;
    }
    try {
        const {payload} = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error:any) {
        console.error('Failed decrypting..',error.message)
        return null
    }
}

export const createSession = async(user:User) => {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    if(!user){
        return;
    }
    const userId = user.id.toString();
    const isAdmin = user.email === 'aslan321@gmail.com';
    const session = await encrypt({userId,name:user.name,email:user.email,
        country:user.country,isAdmin,expiresAt})

    cookies().set('session',session, {
        httpOnly:true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export const deleteSession = () => {
    cookies().delete('session');
}

export const verifySession = async (): Promise<SessionPayload | null> => {
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);
  
    if (session) {
      return session as SessionPayload; 
    }
  
    return null;
  };

export const updateSession = async() => {
    const session = cookies().get('session')?.value;
    const payload = await decrypt(session);
  
    if (!session || !payload) {
      return null;
    }
  
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: 'lax',
      path: '/',
    });
  }