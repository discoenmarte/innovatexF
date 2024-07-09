import { convertJsonToCsv } from '@/lib/actions/download'
import { downloadCsv } from '@/lib/utils/download'
import React from 'react'
import BuildTooltip from './tooltip/build'
import { Button } from './button'
import { FileDown } from 'lucide-react'

type DownloadCsvButtonProps = {
    jsonData: any[]
    filename: string
    tooltipContent: string
}

const DownloadCsvButton: React.FC<DownloadCsvButtonProps> = ({
    jsonData,
    filename,
    tooltipContent,
}) => {
    let processing = false
    const handleDownload = async () => {
        try {
            processing = true
            const csv = await convertJsonToCsv(jsonData)
            downloadCsv(csv, filename)
            processing = false
        } catch (err) {
            processing = false
            console.error('Cannot create CSV:', err)
        }
    }

    return (
        <BuildTooltip
            trigger={
                <Button
                    className="flex gap-2 items-center"
                    variant="outline"
                    size="icon"
                    onClick={handleDownload}
                >
                    <FileDown size={20} />
                </Button>
            }
            content={tooltipContent}
        />
    )
}

export default DownloadCsvButton
