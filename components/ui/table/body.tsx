import { TableBody, TableCell, TableRow } from '.'
import Image from 'next/image'

import { ResponsePagination } from '@/lib/models/api-response'
import { TableLodashService } from '@/lib/services/lodash/indext'
import { TableColumn } from '@/types/table'

export default function TableBodyC({
    columns,
    responsePagination,
    onSelectedRow,
}: {
    columns: TableColumn[]
    responsePagination: ResponsePagination
    onSelectedRow: (row: any) => void
}) {
    const lodashService = new TableLodashService()
    return (
        <TableBody>
            {responsePagination?.results.map((row, rowIndex: number) => (
                <TableRow key={`tr-${row.id}`}>
                    {columns.map(({ value, type }, columIndex) =>
                        type === 'image' && value ? (
                            <TableCell
                                className={`hidden w-[100px] cursor-pointer`}
                                key={`table-img-${value}-${row.id}`}
                                onClick={() =>
                                    onSelectedRow && onSelectedRow(row)
                                }
                            >
                                <Image
                                    src={row[value] ?? '/placeholder.svg'}
                                    alt={`table-img-${row.ref}`}
                                    width={100}
                                    height={100}
                                    priority
                                />
                            </TableCell>
                        ) : (
                            <TableCell
                                key={`table-label-${value}-${row.id}`}
                                className="cursor-pointer"
                                onClick={() =>
                                    onSelectedRow && onSelectedRow(row)
                                }
                            >
                                {lodashService.getRow(row, value, type)}
                            </TableCell>
                        )
                    )}
                </TableRow>
            ))}
        </TableBody>
    )
}
