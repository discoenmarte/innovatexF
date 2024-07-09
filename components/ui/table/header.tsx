import { TableHead, TableHeader, TableRow } from '.'
import { ModelTableHeader } from '@/types/table'

export default function TableHeaderC({
    columns,
}: {
    columns: ModelTableHeader
}) {
    return (
        <TableHeader>
            <TableRow>
                {columns.map(({ label, value, type }) =>
                    type === 'image' ? (
                        <TableHead
                            className="hidden w-[100px]"
                            key={`table-img-header-${value}`}
                        >
                            {label}
                        </TableHead>
                    ) : (
                        <TableHead key={`table-label-header-${value}`}>
                            {label}
                        </TableHead>
                    )
                )}
            </TableRow>
        </TableHeader>
    )
}
