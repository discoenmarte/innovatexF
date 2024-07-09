import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export { default } from 'next-auth/middleware'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const session: any = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV === 'production',
    })

    if (!session) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    const response = NextResponse.next()
    return response
}

export const config = { matcher: ['/admin/:path*'] }
