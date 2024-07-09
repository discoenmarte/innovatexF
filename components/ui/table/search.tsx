'use client'

import { Search } from 'lucide-react'
import { Input } from '../input'
import { useEffect, useState } from 'react'
import useDebounce from '@/hooks/form/UseDebounce'
import Loader from '../loader'
import { ResponsePagination } from '@/lib/models/api-response'
import { query } from '@/lib/actions'

export default function SearchInput({
    setResponsePagination,
    urlBase,
    fetchItems,
}: {
    urlBase: string
    setResponsePagination: (responsePagination: ResponsePagination) => void
    fetchItems?: () => Promise<void>
}) {
    const [searchTerm, setSearchTerm] = useState<string>()
    const debouncedValue = useDebounce<string | undefined>(searchTerm, 500)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        searchTerm?.length === 0 && fetchItems && fetchItems()

        if (searchTerm && debouncedValue) {
            setLoading(true)
            searchData()
        }
    }, [searchTerm])

    const searchData = async () => {
        try {
            if (searchTerm) {
                const url = `${urlBase}?search=${searchTerm}`
                const response = await query(url)

                setResponsePagination(response)
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
            console.error(err)
        }
    }

    return (
        <div className="relative md:grow-0">
            {loading ? (
                <Loader className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            ) : (
                <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            )}
            <Input
                type="search"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
        </div>
    )
}
