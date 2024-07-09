import { TableColumn } from '@/types/table'

export const MENTOR_QUESTIONS_API_URL = '/mentor/questions'

export const MENTOR_QUETIONS_TABLE_COLUMNS: TableColumn[] = [
    {
        label: 'Identificación',
        value: 'customer_student_id',
    },
    {
        label: 'Nombre',
        value: 'student_name',
    },
    {
        label: 'Curso Nombre',
        value: 'course_name',
    },
    {
        label: 'Sección',
        value: 'section_name',
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
        label: 'Puntos Gamificación',
        value: 'gamification_points_section',
    },
    {
        label: 'Grado',
        value: 'grade',
    },
    {
        label: 'Fecha',
        value: 'created',
        type: 'datetime',
    },
]
