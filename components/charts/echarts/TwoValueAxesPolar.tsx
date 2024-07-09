'use client'

import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { useEffect } from 'react'

import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
    PolarComponent,
    LegendComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    PolarComponent,
    LegendComponent,
    CanvasRenderer,
])

export default function EchartsTwoValueAxesPolar() {
    const data: [number, number][] = []

    useEffect(() => {
        for (let i = 0; i <= 360; i++) {
            let t = (i / 180) * Math.PI
            let r = Math.sin(2 * t) * Math.cos(2 * t)
            data.push([r, i])
        }
    }, [])

    const options = {
        legend: {
            data: ['line'],
        },
        polar: {
            center: ['50%', '54%'],
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
        },
        angleAxis: {
            type: 'value',
            startAngle: 0,
        },
        radiusAxis: {
            min: 0,
        },
        series: [
            {
                coordinateSystem: 'polar',
                name: 'line',
                type: 'line',
                showSymbol: false,
                data: data,
            },
        ],
        animationDuration: 2000,
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
