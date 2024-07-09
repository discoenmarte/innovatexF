import { DateRange } from 'react-day-picker'

export type DashboardFilters = {
    region: string | undefined
    program: string | undefined
    headquarter: string | undefined
    date: DateRange | undefined
}

export type InputCombox = {
    value: string
    label: string
}
