import { TableColumn } from '@/types/table'

export const BEST_BUDDY_API_URL = '/best_buddy/questions'

export const BEST_BUDDY_QUESTIONS_TABLE_COLUMNS: TableColumn[] = [
    {
        label: 'Identificación',
        value: 'customer_student_id',
    },
    {
        label: 'Nombre',
        value: 'student_name',
    },
    {
        label: 'Correo',
        value: 'student_email',
    },
    {
        label: 'Región',
        value: 'region',
    },
    {
        label: 'Sede',
        value: 'headquarter',
    },
    {
        label: 'Programa',
        value: 'program',
    },
    {
        label: 'Fecha',
        value: 'created',
        type: 'datetime',
    },
]
