import { getServerSession } from 'next-auth'
import { api } from './auth'
import { selectedEnvironment } from '.'
import { authOptions } from '@/config/auth'

export interface TokensResponse {
    access: string
}

export async function refreshToken(): Promise<TokensResponse | undefined> {
    const session = await getServerSession(authOptions)
    const refresh = session?.user.tokens.refresh
    if (refresh && refresh !== '') {
        selectedEnvironment.BASE_URL = session?.user.baseURL
        const request = await api.post('auth/refresh/', { refresh })
        const accessToken = request.data.access
        const response: TokensResponse = { access: accessToken }
        return response
    }
}
