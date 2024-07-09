import { Account } from './customer'

export interface User {
    profile_id: string
    user_id: number
    username: string
    first_name: string
    last_name: string
    email: string
    role: string
    completed: boolean
    photo_url: string
    created: string
    modified: string
    available: boolean
    groups: Array<any>
}

export interface UserSession {
    success: boolean
    tokens: {
        access: string | undefined
        refresh: string | undefined
    }
    user: User
    baseURL: string
}
