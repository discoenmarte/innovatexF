'use client'

import { DashboardFilters } from '@/types/dashboard'
import BuildCard from '../ui/card/build'
import { useEffect, useState } from 'react'
import { MentorQuestionsService } from '@/lib/services/mentor'
import { ResponsePagination } from '@/lib/models/api-response'
import { NormalDistribution, ResponseNormal } from '@/types/metrics'
import EchartsGauss from '../charts/echarts/Gauss'
import { CardSkeleton } from '../ui/skeletons'
import NormalDistributionStat from './NormalDistributionStat'

export default function NormalDistributionGamification({
    filterValues,
}: {
    filterValues: DashboardFilters | undefined
}) {
    const mentorQuestionsService = new MentorQuestionsService()
    const [response, setResponse] = useState<ResponseNormal>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getNormalDistStudentsData()
    }, [])

    useEffect(() => {
        filterValues && getNormalDistStudentsData()
    }, [filterValues])

    /**
     * A function that retrieves normal distribution data for students.
     *
     * @return {Promise<void>} - A promise that resolves when the data is fetched and processed.
     */
    const getNormalDistStudentsData = async () => {
        try {
            const params = filterValues
                ? {
                      region: filterValues.region,
                      from_date: filterValues.date?.from,
                      to_date: filterValues.date?.to,
                  }
                : undefined

            const response =
                await mentorQuestionsService.fetchNormalDistStudentsData(params)
            console.log('normal dist response', response)

            setResponse(response)
            setLoading(false)
        } catch (err) {
            console.error(
                'Error in fetch normal dist students data request:',
                err
            )
            setLoading(false)
        }
    }
    return (
        <div className="grid md:grid-cols-2 gap-4">
            <BuildCard
                title="Distribución de puntos de gamificación"
                description="Distribución normal de los puntos de gamificación entre los estudiantes."
                content={
                    !loading && response ? (
                        <>
                            {response?.payload?.stat ? (
                                <EchartsGauss data={response.payload} />
                            ) : (
                                <p>No hay datos suficientes</p>
                            )}
                        </>
                    ) : (
                        <CardSkeleton />
                    )
                }
            />
            <BuildCard
                title="Estadísticas de puntos de gamificación"
                description="Detalle de estadísticas de los puntos de gamificación."
                content={
                    !loading && response ? (
                        <NormalDistributionStat
                            stat={response?.payload?.stat}
                        />
                    ) : (
                        <CardSkeleton />
                    )
                }
            />
        </div>
    )
}
