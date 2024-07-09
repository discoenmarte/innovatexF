import { useEffect, useState } from 'react'
import BuildCombobox from '../ui/combobox'
import { query } from '@/lib/actions'
import { InputCombox } from '@/types/dashboard'

export default function HeadquarterCombox({
    setHeadquarter,
}: {
    setHeadquarter: Function
}) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string>()
    const [headquarters, setHeadquarters] = useState<InputCombox[]>([])

    useEffect(() => {
        getHeadQuarters()
    }, [])

    useEffect(() => {
        setHeadquarter(value)
    }, [value])

    /**
     * Retrieves the regions from the server and updates the state.
     * This regions are from Mentor and Best Buddy Metrics.
     * @return {Promise<void>} - A promise that resolves when the regions are retrieved and the state is updated.
     */
    const getHeadQuarters = async () => {
        try {
            let response = await query('/metrics/get_headquarters/')
            response = response.payload.map((headquarter: string) => ({
                value: headquarter,
                label: headquarter,
            }))
            response = response.sort((a: InputCombox, b: InputCombox) =>
                a.label.localeCompare(b.label)
            )
            setHeadquarters(response)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            {!headquarters || headquarters.length === 0 ? undefined : (
                <BuildCombobox
                    array={headquarters}
                    open={open}
                    value={value}
                    setOpen={setOpen}
                    setValue={setValue}
                    placeholder="Sede"
                />
            )}
        </>
    )
}
