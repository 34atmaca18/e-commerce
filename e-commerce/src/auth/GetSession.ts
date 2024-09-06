'use server'

import { decrypt } from "./session"
import { cookies } from "next/headers";
import { SessionPayload } from "@/lib/types";

export const verifySession = async (): Promise<SessionPayload | null> => {
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);
  
    if (session) {
      return session as SessionPayload; 
    }
  
    return null;
  };