import moment from 'moment'
import { APIMetricsService } from '..'
import { query } from '@/lib/actions'
import { API_URL } from '@/config/metrics'
import { StudentsDataConnections } from '@/types/metrics'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/config/auth'

export class MetricsService implements APIMetricsService {
    public async fetchItems(path: string, params?: any): Promise<any> {
        try {
            const response = await query(`${API_URL}${path}`, params)
            return response
        } catch (err) {
            throw new Error(`Failed to fetch best buddy data: ${err}`)
        }
    }

    public async getStudentDataConn(
        path: string,
        params?: any
    ): Promise<StudentsDataConnections> {
        try {
            const connectionsPerDate: { [date: string]: number } = {}
            const connections = await this.fetchItems(path, params)

            for (const connection of connections) {
                const date = moment(connection.created).format('DD-MM-YYYY')
                if (!connectionsPerDate[date]) {
                    connectionsPerDate[date] = 0
                }
                connectionsPerDate[date]++
            }

            // Become precessed data to be used in the chart
            const dates = Object.keys(connectionsPerDate)
            const studentCounts = Object.values(connectionsPerDate)

            return { dates, studentCounts, connections }
        } catch (err) {
            throw new Error(`Failed to fetch best buddy data: ${err}`)
        }
    }

    public async getStudentPercentage(
        connections: any[] | undefined,
        licenses: number
    ) {
        try {
            const connectionsPerDate: { [date: string]: number } = {}

            if (!connections) return

            for (const connection of connections) {
                const date = moment(connection.created).format('DD-MM-YYYY')
                if (!connectionsPerDate[date]) {
                    connectionsPerDate[date] = 0
                }
                connectionsPerDate[date]++
            }

            // Become precessed data to be used in the chart
            const dates = Object.keys(connectionsPerDate)
            // Calculate percentage
            for (const date in connectionsPerDate) {
                connectionsPerDate[date] = Number(
                    ((connectionsPerDate[date] / licenses) * 100).toFixed(3)
                )
            }
            const studentCounts = Object.values(connectionsPerDate)

            return { dates, studentCounts }
        } catch (err) {
            throw new Error(`Failed to fetch best buddy data: ${err}`)
        }
    }
}
