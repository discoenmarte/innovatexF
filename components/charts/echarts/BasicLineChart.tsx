'use client'

import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
    ToolboxComponent,
    MarkPointComponent,
} from 'echarts/components'

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LineChart,
    CanvasRenderer,
    ToolboxComponent,
    MarkPointComponent,
])

export default function EchartsBasicLineChart({
    xAxisType = 'category',
    xAxisData,
    yAxisType = 'value',
    seriesData,
    formatter = null,
}: {
    xAxisType?: 'category' | 'time'
    xAxisData: string[]
    yAxisType?: 'value' | 'log'
    seriesData: number[]
    formatter?: string | null
}) {
    const options = {
        color: ['#000000'],
        tooltip: {
            trigger: 'axis',
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                },
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {},
            },
        },
        xAxis: {
            type: xAxisType,
            data: xAxisData, // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: yAxisType,
            axisLabel: {
                formatter,
            },
        },
        series: [
            {
                name: 'Estudiantes',
                type: 'line',
                data: seriesData, // [150, 230, 224, 218, 135, 147, 260],
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' },
                    ],
                },
                markLine: {
                    data: [{ type: 'average', name: 'Avg' }],
                },
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
