'use client'

import { useEffect, useState } from 'react'
import { Button } from '../button'
import { RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ResponsePagination } from '@/lib/models/api-response'
import { query } from '@/lib/actions'

export default function RefresDataButton({
    apiURL,
    setResponsePagination,
}: {
    apiURL: string
    setResponsePagination: (responsePagination: ResponsePagination) => void
}) {
    const [refresing, setrefresing] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (refresing) {
            setTimeout(() => setrefresing(false), 500)
            refreshData()
        }
    }, [refresing])

    const refreshData = async () => {
        try {
            const response = await query(apiURL)
            setResponsePagination(response)
        } catch (err) {
            console.error('Error in refresh request:', err)
        }
    }

    return (
        <Button
            onClick={() => setrefresing(!refresing)}
            variant="outline"
            size="icon"
        >
            <RefreshCw className={`${refresing && 'animate-spin'}`} size={18} />
        </Button>
    )
}
