import axios, { AxiosInstance } from 'axios'
import { getServerSession } from 'next-auth'
import { refreshToken } from './refresh'
import { selectedEnvironment } from '.'
import { authOptions } from '@/config/auth'

const config = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
}

// Request to api without authentication
export const api: AxiosInstance = axios.create(config)
api.interceptors.request.use((request) => {
    request.baseURL = selectedEnvironment.BASE_URL
    return request
})

// Request to api with authentication and refresh token
const apiAuth: AxiosInstance = axios.create(config)

apiAuth.interceptors.request.use(
    async (request) => {
        const session = await getServerSession(authOptions)
        // Configure tenant enpoint
        request.baseURL = session?.user.baseURL

        request.headers[
            'Authorization'
        ] = `Bearer ${session?.user.tokens.access}`
        return request
    },
    (err) => err
)

apiAuth.interceptors.response.use(
    async (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config

        if (error.response.status === 401 && !originalRequest.sent) {
            originalRequest.sent = true
            // Get session data
            const session = await getServerSession(authOptions)

            try {
                const tokens = await refreshToken()
                if (tokens && session) {
                    session.user.tokens.access = tokens.access

                    const authorization = `Bearer ${tokens.access}`
                    originalRequest.headers['Authorization'] = authorization

                    // Retry the original request with new authorization
                    return axios(originalRequest)
                }
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError)
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default apiAuth
