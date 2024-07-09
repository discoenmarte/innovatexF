'use client'

import { useEffect, useState } from 'react'
import { BuildModelTable } from '../ui/table/build'
import { MENTOR_QUETIONS_TABLE_COLUMNS } from '@/config/mentor'
import MentorQuestionsDetail from './MentorQuestionsDetail'
import { MentorQuestionsService } from '@/lib/services/mentor'
import { ResponsePagination } from '@/lib/models/api-response'
import { DashboardFilters } from '@/types/dashboard'

export default function MentorQuestionsTable({
    filterValues,
}: {
    filterValues: DashboardFilters | undefined
}) {
    const mentorQuestionsService = new MentorQuestionsService()
    const [responsePagination, setResponsePagination] =
        useState<ResponsePagination>({
            count: 0,
            next: null,
            previous: null,
            results: [],
        })
    const mentorAPIURL = mentorQuestionsService.getAPIUrl()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMentorQuestions()
    }, [])

    useEffect(() => {
        filterValues && getMentorQuestions()
    }, [filterValues])

    /**
     * Retrieves mentor questions from the service and updates the response pagination state.
     *
     * @return {Promise<void>} - A promise that resolves when the mentor questions are retrieved and the loading state is set to false.
     */
    const getMentorQuestions = async () => {
        try {
            const params = filterValues
                ? {
                      region: filterValues.region,
                      from_date: filterValues.date?.from,
                      to_date: filterValues.date?.to,
                  }
                : undefined

            const response = await mentorQuestionsService.fetchItems(params)
            setResponsePagination(response)
            setLoading(false)
        } catch (err) {
            console.error('Error in fetch mentor questions request:', err)
            setLoading(false)
        }
    }

    return (
        <BuildModelTable
            columns={MENTOR_QUETIONS_TABLE_COLUMNS}
            responsePagination={responsePagination}
            setResponsePagination={setResponsePagination}
            apiURL={mentorAPIURL}
            fetchItems={getMentorQuestions}
            detailModal={{
                title: 'Detalle de la interacción',
                children: <MentorQuestionsDetail />,
            }}
            loading={loading}
            metadata={{
                modelName: 'interacción',
                modelNamePlural: 'intereacciones',
                title: 'Interacción Mentor',
                description:
                    'Estos son las intereacciones del mentor con los estudiantes.',
            }}
            exportFileName={`intereacciones_mentor_${Date.now()}`}
        />
    )
}
