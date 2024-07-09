'use client'

import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
} from 'echarts/components'

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    BarChart,
    CanvasRenderer,
])

export default function EchartsBasicBarChart({
    xAxisType = 'category',
    xAxisData,
    yAxisType = 'value',
    seriesData,
}: {
    xAxisType?: 'category' | 'time'
    xAxisData: string[]
    yAxisType?: 'value' | 'log'
    seriesData: number[]
}) {
    const options = {
        xAxis: {
            type: xAxisType,
            data: xAxisData,
        },
        yAxis: {
            type: yAxisType,
        },
        series: [
            {
                type: 'bar',
                data: seriesData,
            },
        ],
    }

    return (
        <ReactEChartsCore
            echarts={echarts}
            option={options}
            notMerge={true}
            lazyUpdate={true}
        />
    )
}
