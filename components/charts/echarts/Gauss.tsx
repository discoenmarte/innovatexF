'use client'

import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
} from 'echarts/components'
import { NormalDistribution } from '@/types/metrics'

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    BarChart,
    LineChart,
    CanvasRenderer,
])

export default function EchartsGauss({ data }: { data: NormalDistribution }) {
    const options = {
        color: ['#000000'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
        },
        xAxis: {
            type: 'category',
            data: data?.bin_centers,
        },
        yAxis: [
            {
                type: 'value',
                name: 'Frequency',
            },
            {
                type: 'value',
                name: 'Density',
            },
        ],
        series: [
            {
                name: 'Histogram',
                type: 'bar',
                data: data.hist,
                yAxisIndex: 0,
            },

            {
                name: 'Density',
                type: 'line',
                data: data?.density_y,
                lineStyle: {
                    color: 'red',
                },
                yAxisIndex: 1,
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
