import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        // If the user is not an admin, redirect them to the home page
        if (req.nextauth.token?.user?.role !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
        '/api/admin/:path*',
        '/api/protected/:path*',
    ],
}; 