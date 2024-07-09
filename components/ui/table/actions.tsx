'use client'

import { MoreHorizontal } from 'lucide-react'
import { Button } from '../button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '../dropdown-menu'
import { Convert } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { TableActions } from '@/types/table'
import { destroy } from '@/lib/actions/rest'

export default function TableActionsButtons({
	row,
	apiURL,
	clientURL,
}: TableActions) {
	const router = useRouter()

	const edit = () => {
		const dataString = Convert.encodeURIJSON(row)
		const detailUrl = `${clientURL}/edit/${dataString}`
		setTimeout(() => router.push(detailUrl))
	}

	const remove = async () => {
		try {
			await destroy(`${apiURL}/${row.id}`)
			router.refresh()
		} catch (err) {
			throw new Error(`cannot destroy data: ${err}`)
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button aria-haspopup='true' size='icon' variant='ghost'>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Acción</DropdownMenuLabel>
				<DropdownMenuItem onClick={() => edit()}>
					Editar
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => remove()}>
					Borrar
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
