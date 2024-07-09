import { Account } from '@/lib/models/customer'
import { selectedEnvironment } from '.'
import { api } from './auth'

/**
 * Authenticates a user with the provided credentials.
 *
 * @param {Record<'username' | 'password' | 'customer', string> | undefined} credentials - The user's credentials.
 * @return {Promise<Record<'username' | 'password' | 'customer', string> | null>} A Promise that resolves to the user's session data if authentication is successful, or null if authentication fails.
 */
export async function authenticate(
    credentials:
        | Record<'username' | 'password', string>
        | undefined
) {
    try {
        if (!credentials) return

        // const accountData: Account[] = await getCustomerAPIURL(
        //     credentials.customer
        // )
        // const accountPayload = accountData[0]

        // const domain = accountPayload.tenant_domain
        // const API_TENANT_URL =
        //     selectedEnvironment.ENV === 'dev'
        //         ? `http://${domain}:8000/api/v1/`
        //         : `https://${domain}/api/v1/`

        // // Set the tenant enpoint
        // selectedEnvironment.BASE_URL = API_TENANT_URL

        const response = await api.post('login/', {
            username: credentials.username,
            password: credentials.password,
        })

        const userSessionData = {
            ...response.data,
            baseURL: ''
        }
        return userSessionData ? userSessionData : null
    } catch (err) {
        console.error('Cannot singn in:', err)
    }
}

/**
 * Retrieves the API URL for a customer account based on the provided account reference.
 *
 * @param {string} accountRef - The reference of the customer account.
 * @return {Promise<Account[]>} A promise that resolves to an array of Account objects representing the customer account.
 * @throws {Error} If there is an error retrieving the customer data.
 */
async function getCustomerAPIURL(accountRef: string): Promise<Account[]> {
    try {
        // Public tentant
        const domain = selectedEnvironment.MAIN_DOMAIN
        const MainURL =
            selectedEnvironment.ENV === 'dev'
                ? `http://${domain}`
                : `https://${domain}`

        // Configure public tenant enpoint
        selectedEnvironment.BASE_URL = `${MainURL}/api/v1/`

        // Authentication in public tenant
        const username = process.env.PT_ACCESS_USER
        const password = process.env.PT_ACCESS_PASSWORD
        const authorization = await api.post('login/', { username, password })

        const customersURL = `${MainURL}/customers/accounts/?search=${accountRef}`
        const response = await api.get(customersURL, {
            headers: {
                Authorization: `Bearer ${authorization.data.tokens.access}`,
            },
        })

        return response.data
    } catch (err) {
        throw new Error(`Cannot get customer data: ${err}`)
    }
}
