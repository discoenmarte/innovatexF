// import { TableCustomComponentProps } from '@/types/table' // This is never used
import * as lodash from 'lodash'
import moment from 'moment'

moment.locale('es')

export class TableLodashService {
	public getRow(
		row: any,
		value: string | undefined,
		type: string | undefined
		// rowIndex: number,
		// columIndex: number
	) {
		// Formatted date
		this.dateFormat(row, value, type)

		// Mapping if is only simple string or component type
		const result = value ? lodash.get(row, value) : undefined

		return result
	}

	private dateFormat(
		row: any,
		value: string | undefined,
		type: string | undefined
	): void {
		if (value && type === 'date') {
			let formattedDate = moment(row[value]).format('YYYY-MM-DD')
			row[value] = formattedDate === 'Invalid date' ? '' : formattedDate
		} else if (value && type === 'datetime') {
			let formattedDate = moment(row[value]).format('YYYY-MM-DD HH:mm')
			row[value] = formattedDate === 'Invalid date' ? '' : formattedDate
		}
	}

	// private buildCustomComponentProps(
	// 	row: any,
	// 	rowIndex: number,
	// 	columIndex: number
	// ): TableCustomComponentProps {
	// 	return {
	// 		row,
	// 		rowIndex,
	// 		columIndex,
	// 	}
	// }
}
