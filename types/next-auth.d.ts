import NextAuth from 'next-auth/next'
import { UserSession } from '../lib/models/user'

declare module 'next-auth' {
    interface Session {
        user: UserSession
    }
}
