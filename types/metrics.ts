import { StudentConnection } from '@/lib/models/student-connection'

export type StudentsDataConnections = {
    dates: string[]
    studentCounts: number[]
    connections: StudentConnection[]
}

export type StudentsData = {
    dates: string[]
    studentCounts: number[]
}

export type ResponseNormal = {
    success: boolean
    payload: NormalDistribution
}

export type NormalDistribution = {
    stat: NormatDistributionStat | null
    hist: number[]
    bin_centers: number[]
    density_x: number[]
    density_y: number[]
}

export type NormatDistributionStat = {
    mean: number
    std: number
    min: number
    max: number
    count: number
    '25%': number
    '50%': number
    '75%': number
}
