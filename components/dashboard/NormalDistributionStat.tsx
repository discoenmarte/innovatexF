import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { NormatDistributionStat } from '@/types/metrics'

export default function NormalDistributionStat({
    stat,
}: {
    stat: NormatDistributionStat | null
}) {
    return (
        <>
            {stat ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No. Registros</TableHead>
                            <TableHead>Promedio</TableHead>
                            <TableHead>Mínimo</TableHead>
                            <TableHead>Maximo</TableHead>
                            <TableHead>Des. Estandar</TableHead>
                            <TableHead>25%</TableHead>
                            <TableHead>50%</TableHead>
                            <TableHead>75%</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {stat ? (
                            <TableRow>
                                <TableCell>{stat?.count}</TableCell>
                                <TableCell>{stat?.mean.toFixed(2)}</TableCell>
                                <TableCell>{stat?.min}</TableCell>
                                <TableCell>{stat?.max}</TableCell>
                                <TableCell>{stat?.std.toFixed(2)}</TableCell>
                                <TableCell>{stat ? stat['25%'] : 0}</TableCell>
                                <TableCell>{stat ? stat['50%'] : 0}</TableCell>
                                <TableCell>{stat ? stat['75%'] : 0}</TableCell>
                            </TableRow>
                        ) : (
                            <TableRow className="text-center"></TableRow>
                        )}
                    </TableBody>
                </Table>
            ) : (
                <p>No hay estadística disponible</p>
            )}
        </>
    )
}
