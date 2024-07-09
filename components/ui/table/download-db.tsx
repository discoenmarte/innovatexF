'use client'

import React, { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { DatePickerWithRange } from '../date-picker-range'
import { Button } from '../button'
import { query } from '@/lib/actions'
import { convertJsonToCsv } from '@/lib/actions/download'
import { downloadCsv } from '@/lib/utils/download'
import Loader from '../loader'

export default function DownloadDB({
    apiURL,
    filename,
}: {
    apiURL: string
    filename: string
}) {
    const [date, setDate] = useState<DateRange | undefined>()
    const [processing, setProcessing] = useState(false)

    /**
     * Asynchronous function to fetch data based on provided parameters.
     *
     * @return {Promise<any>} The response data from the query.
     */
    const getData = async () => {
        try {
            let params = {
                flat: true,
                from_date: date?.from ?? undefined,
                to_date: date?.to ?? undefined,
            }

            const response = await query(apiURL, params)
            return response
        } catch (err) {
            console.error('Cannot get data:', err)
        }
    }

    /**
     * Asynchronous function that handles the download process.
     *
     * @param {React.MouseEvent} event - The mouse event triggering the download.
     * @return {void} No return value.
     */
    const download = async (event: React.MouseEvent) => {
        event.preventDefault()
        setProcessing(true)

        try {
            const data = await getData()
            if (data.length > 0) {
                const csv = await convertJsonToCsv(data)
                downloadCsv(csv, filename)
            } else {
                alert('No hay datos para descargar')
            }
            setProcessing(false)
        } catch (err) {
            setProcessing(false)
            console.error('Cannot download data:', err)
        }
    }

    return (
        <div className="grid gap-4">
            <div className="grid">
                <DatePickerWithRange setDate={setDate} />
                <small className="text-gray-500">
                    Puede definir un rango de fechas para descargar todo lo
                    contemplado en el mismo.
                </small>
            </div>
            {processing && (
                <small className="text-alert">
                    No cerrar o recargar la página
                </small>
            )}
            <Button className="w-full flex gap-2" onClick={download}>
                {processing && <Loader />}
                Descargar datos
            </Button>
        </div>
    )
}
