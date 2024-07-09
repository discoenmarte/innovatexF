import { ResponsePagination } from '@/lib/models/api-response'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../pagination'
import { useState } from 'react'
import { query } from '@/lib/actions'

export default function TablePagination({
    responsePagination,
    setResponsePagination,
    apiURL,
    label,
}: {
    responsePagination: ResponsePagination
    setResponsePagination: (responsePagination: ResponsePagination) => void
    apiURL: string
    label?: string
}) {
    const [currentPage, setCurrentPage] = useState<number>(1)

    /**
     * Handles pagination by setting the current page, and making
     * an API request if necessary.
     *
     * @param {number} page - The page number to navigate to.
     * @return {void} This function does not return anything.
     */
    const handlerPagination = (page: number) => {
        if (currentPage >= 1 && page > currentPage && responsePagination.next) {
            setCurrentPage(page)
            apiRequest(page)
        } else if (
            currentPage > 1 &&
            page < currentPage &&
            responsePagination.previous
        ) {
            setCurrentPage(page)
            apiRequest(page)
        }
    }

    /**
     * Sends an API request to retrieve data for a specific page and
     * updates the response pagination state.
     *
     * @param {number} page - The page number to retrieve data for.
     * @return {Promise<void>} - A promise that resolves when the API
     * request is complete.
     */
    const apiRequest = async (page: number) => {
        try {
            const response = await query(apiURL, { page })
            setResponsePagination(response)
        } catch (err) {
            console.error('Error in pagination request:', err)
        }
    }

    return (
        <>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            className={`${
                                !responsePagination?.previous &&
                                'text-primary/20 hover:text-primary/20 hover:bg-transparent'
                            }`}
                            onClick={() => handlerPagination(currentPage - 1)}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink>{currentPage}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            className={`${
                                !responsePagination?.next &&
                                'text-primary/20 hover:text-primary/20 hover:bg-transparent'
                            }`}
                            onClick={() => handlerPagination(currentPage + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <div className="text-xs text-muted-foreground">
                Pag. {currentPage} de{' '}
                <strong>
                    {Math.ceil(responsePagination?.count / 20) === 0
                        ? 1
                        : Math.ceil(responsePagination?.count / 20)}
                </strong>
                {' - '}
                {`total ${label ?? ''}`}{' '}
                <strong>{responsePagination?.count}</strong>
            </div>
        </>
    )
}
