'use client'

import EchartsBasicLineChart from '@/components/charts/echarts/BasicLineChart'
import DownloadCsvButton from '@/components/ui/download-buttton'
import { CardSkeleton } from '@/components/ui/skeletons'
import { StudentConnection } from '@/lib/models/student-connection'
import { StudentsData, StudentsDataConnections } from '@/types/metrics'

export default function StudentsConnections({
    studentsDataConnections,
    studentsData,
    exportFileName,
    exportTooltipContent,
    formatterYAxis = null,
}: {
    studentsDataConnections?: StudentsDataConnections | undefined
    studentsData?: StudentsData | undefined
    exportFileName: string
    exportTooltipContent: string
    formatterYAxis?: string | null
}) {
    return studentsDataConnections || studentsData ? (
        <div className="grid">
            {studentsDataConnections &&
            studentsDataConnections.connections.length > 0 ? (
                <>
                    <div className="flex justify-end">
                        <DownloadCsvButton
                            jsonData={studentsDataConnections.connections}
                            filename={exportFileName}
                            tooltipContent={exportTooltipContent}
                        />
                    </div>
                    <EchartsBasicLineChart
                        xAxisData={studentsDataConnections.dates}
                        seriesData={studentsDataConnections.studentCounts}
                        formatter={formatterYAxis}
                    />
                </>
            ) : studentsData && studentsData.dates.length > 0 ? (
                <>
                    <EchartsBasicLineChart
                        xAxisData={studentsData.dates}
                        seriesData={studentsData.studentCounts}
                        formatter={formatterYAxis}
                    />
                </>
            ) : (
                <p>No hay datos disponibles</p>
            )}
        </div>
    ) : (
        <CardSkeleton />
    )
}
