import { Clock } from 'lucide-react'

export default function TimeBox({
    label,
    value,
}: {
    label: string
    value: any
}) {
    return (
        <div
            className="grid gap-1 text-center border
				rounded-lg  border-gray-200 p-2 w-[7rem]"
        >
            <div className="relative">
                <Clock
                    className="absolute -left-3.5 -top-4 bg-white"
                    size={20}
                />
            </div>
            <div className="flex justify-center gap-3">
                <span className="text-sm font-medium text-gray-900">
                    {value}
                </span>
            </div>
            <span className="flex justify-center gap-2 text-xs text-gray-500 font-semibold">
                {label}
            </span>
        </div>
    )
}
