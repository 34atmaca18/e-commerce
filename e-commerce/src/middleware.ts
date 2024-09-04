import { NextRequest,NextResponse } from "next/server";
import { decrypt } from "@/auth/session";
import { cookies } from "next/headers";

const protectedRoutes = ['/adminpanel','/profile']
const adminRoute = ['/adminpanel']
const loginRoutes = ['/login','/register']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isLoginRoute = loginRoutes.includes(path);
    const isAdminRoute = adminRoute.includes(path);
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);
  
    if (isProtectedRoute && !session?.userId) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    if(isAdminRoute && !session?.isAdmin){
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  
    if (
      isLoginRoute &&
      session?.userId ) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    return NextResponse.next();
  }

  export const config = {
    matcher: ['/adminpanel','/login','/register','/profile'], 
  };
  