import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '../button'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '../command'
import { cn } from '@/lib/utils'

export default function BuildCombobox({
    array,
    open,
    value,
    setOpen,
    setValue,
    placeholder,
}: {
    array: any[]
    open: boolean
    value: string | undefined
    setOpen: (open: boolean) => void
    setValue: Function
    placeholder: string
}) {
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full md:w-fit justify-between"
                >
                    {value
                        ? array.find((item: any) => item.value === value)?.label
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full md:w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandEmpty>
                        No fue encontrada ninguna región.
                    </CommandEmpty>
                    <CommandGroup>
                        {array.map((item: any, index: number) => (
                            <CommandItem
                                key={item.value}
                                value={item.value}
                                onSelect={(currentValue) => {
                                    setValue(
                                        currentValue === value
                                            ? undefined
                                            : currentValue
                                    )
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        value === item.value
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    )}
                                />
                                {item.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
