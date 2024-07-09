'use client'

import BuildCard from '@/components/ui/card/build'
import { MetricsService } from '@/lib/services/dashboard/metrics'
import { StudentsDataConnections } from '@/types/metrics'
import { useEffect, useState } from 'react'
import StudentsConnections from './StudentsConnections'
import { DashboardFilters } from '@/types/dashboard'

export default function GetStudentsConnectedNum({
    filterValues,
    setMentorStudentsConnected,
    setBestBuddyStudentsConnected,
}: {
    filterValues: DashboardFilters | undefined
    setMentorStudentsConnected: Function
    setBestBuddyStudentsConnected: Function
}) {
    const metricsService = new MetricsService()
    const [bestBuddyStudents, setBestBuddyStudents] =
        useState<StudentsDataConnections>()
    const [mentorStudents, setMentorStudents] =
        useState<StudentsDataConnections>()

    useEffect(() => {
        getMetrics()
    }, [])

    useEffect(() => {
        getMetrics()
    }, [filterValues])

    /**
     * Retrieves metrics for best buddy and mentor students.
     *
     * @return {Promise<void>} - A promise that resolves when the metrics are retrieved and set.
     */
    const getMetrics = async () => {
        const params = filterValues
            ? {
                  region: filterValues.region,
                  program: filterValues.program,
                  headquarter: filterValues.headquarter,
                  from_date: filterValues.date?.from,
                  to_date: filterValues.date?.to,
              }
            : undefined

        const responseBestBuddy = await metricsService.getStudentDataConn(
            '/best_buddy_conn/',
            params
        )

        const responseMentor = await metricsService.getStudentDataConn(
            '/mentor_conn/',
            params
        )

        setBestBuddyStudents(responseBestBuddy)
        setBestBuddyStudentsConnected(responseBestBuddy)
        setMentorStudents(responseMentor)
        setMentorStudentsConnected(responseMentor)
    }

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <BuildCard
                title="Conexiones al Mentor"
                description="Cantidad de estudiantes que accedierón al Mentor"
                content={
                    <StudentsConnections
                        studentsDataConnections={mentorStudents}
                        exportFileName={`mentor_connections_${Date.now()}.csv`}
                        exportTooltipContent="Descargar datos"
                    />
                }
            />
            <BuildCard
                title="Conexiones Best Buddy"
                description="Cantidad de estudiantes que accedierón al Best Buddy"
                content={
                    <StudentsConnections
                        studentsDataConnections={bestBuddyStudents}
                        exportFileName={`best_buddy_connections_${Date.now()}.csv`}
                        exportTooltipContent="Descargar datos"
                    />
                }
            />
        </div>
    )
}
