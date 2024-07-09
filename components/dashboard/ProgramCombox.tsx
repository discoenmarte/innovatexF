import { query } from '@/lib/actions'
import { useEffect, useState } from 'react'
import BuildCombobox from '../ui/combobox'
import { InputCombox } from '@/types/dashboard'

export function ProgramCombox({ setProgram }: { setProgram: Function }) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string>()
    const [programs, setPrograms] = useState<InputCombox[]>([])

    useEffect(() => {
        getPrograms()
    }, [])

    useEffect(() => {
        setProgram(value)
    }, [value])

    /**
     * Retrieves the regions from the server and updates the state.
     * This regions are from Mentor and Best Buddy Metrics.
     * @return {Promise<void>} - A promise that resolves when the regions are retrieved and the state is updated.
     */
    const getPrograms = async () => {
        try {
            let response = await query('/metrics/get_programs/')
            response = response.payload.map((program: string) => ({
                value: program,
                label: program,
            }))
            response = response.sort((a: InputCombox, b: InputCombox) =>
                a.label.localeCompare(b.label)
            )
            setPrograms(response)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            {!programs || programs.length === 0 ? undefined : (
                <BuildCombobox
                    array={programs}
                    open={open}
                    value={value}
                    setOpen={setOpen}
                    setValue={setValue}
                    placeholder="Programa"
                />
            )}
        </>
    )
}
