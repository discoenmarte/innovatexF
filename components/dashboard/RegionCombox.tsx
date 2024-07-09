'use client'

import { useEffect, useState } from 'react'
import { query } from '@/lib/actions'
import BuildCombobox from '../ui/combobox'
import { InputCombox } from '@/types/dashboard'

export function RegionCombox({ setRegion }: { setRegion: Function }) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string>()
    const [regions, setRegions] = useState<InputCombox[]>([])

    useEffect(() => {
        getRegions()
    }, [])

    useEffect(() => {
        setRegion(value)
    }, [value])

    /**
     * Retrieves the regions from the server and updates the state.
     * This regions are from Mentor and Best Buddy Metrics.
     * @return {Promise<void>} - A promise that resolves when the regions are retrieved and the state is updated.
     */
    const getRegions = async () => {
        try {
            let response = await query('/metrics/get_regions/')
            response = response.payload.map((region: string) => ({
                value: region,
                label: region,
            }))
            response = response.sort((a: InputCombox, b: InputCombox) =>
                a.label.localeCompare(b.label)
            )
            setRegions(response)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            {!regions || regions.length === 0 ? undefined : (
                <BuildCombobox
                    array={regions}
                    open={open}
                    value={value}
                    setOpen={setOpen}
                    setValue={setValue}
                    placeholder="Región"
                />
            )}
        </>
    )
}
