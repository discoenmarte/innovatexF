'use server'

import { json2csv } from 'json-2-csv'
import { promisify } from 'util'

const json2csvAsync = promisify(json2csv)

export async function convertJsonToCsv(data: Object[]): Promise<any> {
    return json2csv(data)
}

export async function convertJsonToCsvProgress(
    data: Object[],
    chunkSize: number,
    onProgress: (progress: any) => void
) {
    let csv = ''
    const totalChunks = Math.ceil(data.length / chunkSize)
    for (let i = 0; i < totalChunks; i++) {
        const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize)
        const csvChunk: any = await json2csvAsync(chunk, {
            prependHeader: i === 0,
        })

        // Append the csvChunk to the final CSV string (excluding the header for subsequent chunks)
        csv += i === 0 ? csvChunk : csvChunk.split('\n').slice(1).join('\n')

        // Report progress
        const progress = ((i + 1) / totalChunks) * 100
        onProgress(progress)
    }
    return csv
}
