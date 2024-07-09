'use client'

import BuildCard from '@/components/ui/card/build'
import { MetricsService } from '@/lib/services/dashboard/metrics'
import { StudentsDataConnections } from '@/types/metrics'
import { useEffect, useState } from 'react'
import StudentsConnections from './StudentsConnections'
import { DashboardFilters } from '@/types/dashboard'
import { useSession } from 'next-auth/react'

export default function GetStudentsConnectedPer({
    filterValues,
    mentorConnections,
    bestBuddyConnections,
}: {
    filterValues: DashboardFilters | undefined
    mentorConnections: any[] | undefined
    bestBuddyConnections: any[] | undefined
}) {
    const metricsService = new MetricsService()
    const [bestBuddyStudents, setBestBuddyStudents] = useState<any>()
    const [mentorStudents, setMentorStudents] = useState<any>()
    const { data: session } = useSession()

    

    /**
     * Retrieves metrics for best buddy and mentor students.
     *
     * @return {Promise<void>} - A promise that resolves when the metrics are retrieved and set.
     */
    

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <BuildCard
                title="Porcentaje de Conexiones al Mentor"
                description="Porcentaje de estudiantes que accedierón al Mentor según número de licencias"
                content={
                    <StudentsConnections
                        studentsData={mentorStudents}
                        exportFileName={`mentor_connections_${Date.now()}.csv`}
                        exportTooltipContent="Descargar datos"
                        formatterYAxis="{value}%"
                    />
                }
            />
            <BuildCard
                title="Porcentaje de Conexiones al Best Buddy"
                description="Porcentaje de estudiantes que accedierón por día al Best Buddy según número de licencias"
                content={
                    <StudentsConnections
                        studentsData={bestBuddyStudents}
                        exportFileName={`best_buddy_connections_${Date.now()}.csv`}
                        exportTooltipContent="Descargar datos"
                        formatterYAxis="{value}%"
                    />
                }
            />
        </div>
    )
}
