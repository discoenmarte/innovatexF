import { authenticate } from '@/lib/services/axios/authenticate'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    secret: process.env.JWT_SECRET,
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            id: "domain-login",
            name: "Domain Account",
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const userSessionData = await authenticate(credentials)
                return userSessionData
            },
        }),
    ],
    session: { strategy: 'jwt', maxAge: 28800 }, // Seconds - 8 hours
    callbacks: {
        async jwt({ token, user, account }) {
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            session.user = token as any
            return session
        },
        async redirect({ url, baseUrl }) {
            // Ensure the redirect URL is to your site and not localhost
            if (url.startsWith('/')) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
    debug: false,
}

