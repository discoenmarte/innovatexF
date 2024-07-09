import { ResponsePagination } from '../models/api-response'

export interface APIService {
    fetchItems(params?: any): Promise<ResponsePagination | any[]>
    createItem(data: any, config?: any): Promise<any>
    updateItem(data: any, partial: boolean, config?: any): Promise<any>
}

export interface APIMetricsService {
    fetchItems(
        path: string,
        params?: any
    ): Promise<ResponsePagination | any[] | Object>
}
