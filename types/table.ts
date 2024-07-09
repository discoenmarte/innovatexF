import { ResponsePagination } from '@/lib/models/api-response'
import { APIService } from '@/lib/services'
import { FunctionComponent } from 'react'

export type TableColumn = {
    label: string
    value?: string | undefined
    type?: string | undefined
    sortable?: boolean
    style?: string | undefined
    render?: FunctionComponent
}

export type ModelTableHeader = Array<TableColumn>

export type ModelTableMeta = {
    modelName?: string
    modelNamePlural?: string
    title?: string
    description?: string
}

export type ModelTable = {
    columns: ModelTableHeader
    responsePagination: ResponsePagination
    setResponsePagination: (responsePagination: ResponsePagination) => void
    apiURL: string
    detailModal: {
        title: string
        children: React.ReactNode
    }
    fetchItems?: () => Promise<void>
    loading: boolean
    loader?: React.ReactNode
    metadata?: ModelTableMeta
    exportFileName: string
}

export type TableActions = {
    row: any
    apiURL: string
    clientURL: string
}
