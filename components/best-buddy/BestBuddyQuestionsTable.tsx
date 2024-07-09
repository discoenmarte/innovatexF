'use client'

import { BEST_BUDDY_QUESTIONS_TABLE_COLUMNS } from '@/config/best-buddy'
import { ResponsePagination } from '@/lib/models/api-response'
import { BestBuddyQuestionsService } from '@/lib/services/best-buddy/questions'
import { useEffect, useState } from 'react'
import { BuildModelTable } from '../ui/table/build'
import BestBuddyQuestionDetail from './BestBuddyQuestionDetail'
import { DashboardFilters } from '@/types/dashboard'

export default function BestBuddyQuestionTable({
    filterValues,
}: {
    filterValues: DashboardFilters | undefined
}) {
    const bestBuddyQuestionsService = new BestBuddyQuestionsService()
    const [responsePagination, setResponsePagination] =
        useState<ResponsePagination>({
            count: 0,
            next: null,
            previous: null,
            results: [],
        })
    const bestBuddyAPIURL = bestBuddyQuestionsService.getAPIUrl()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getBestBuddyQuestions()
    }, [])

    useEffect(() => {
        filterValues && getBestBuddyQuestions()
    }, [filterValues])

    /**
     * Retrieves mentor questions from the service and updates the response pagination state.
     *
     * @return {Promise<void>} - A promise that resolves when the mentor questions are retrieved and the loading state is set to false.
     */
    const getBestBuddyQuestions = async () => {
        try {
            const response = await bestBuddyQuestionsService.fetchItems()
            setResponsePagination(response)
            setLoading(false)
        } catch (err) {
            console.error('Error in fetch mentor questions request:', err)
            setLoading(false)
        }
    }

    return (
        <BuildModelTable
            columns={BEST_BUDDY_QUESTIONS_TABLE_COLUMNS}
            responsePagination={responsePagination}
            setResponsePagination={setResponsePagination}
            apiURL={bestBuddyAPIURL}
            fetchItems={getBestBuddyQuestions}
            detailModal={{
                title: 'Detalle de la interacción',
                children: <BestBuddyQuestionDetail />,
            }}
            loading={loading}
            metadata={{
                modelName: 'interacción',
                modelNamePlural: 'intereacciones',
                title: 'Interacción Best Buddy',
                description:
                    'Estos son las intereacciones del best buddy con los estudiantes.',
            }}
            exportFileName={`intereacciones_best_buddy_${Date.now()}`}
        />
    )
}
