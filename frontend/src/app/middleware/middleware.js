const { NextResponse } = require("next/server");


export function middleware(request){

    const  authToken = request.cookies.get('auth_token')?.values;
    if(!authToken && request.nextUrl.pathname.startWith('/user/dashboard')){
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}


export const config = {
    matcher:['/user/dashboard/:path*'],
}