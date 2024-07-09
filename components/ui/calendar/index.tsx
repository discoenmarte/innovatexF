import moment from 'moment'
import {
    Calendar,
    View,
    Event,
    DateLocalizer,
    Messages,
    momentLocalizer,
    Components,
} from 'react-big-calendar'
import 'moment/locale/es'

moment.locale('es')

export default function BuildCalendar({
    ...props
}: {
    culture?: string
    scrollToTime?: Date
    defaultView?: View
    events?: Event[]
    localizer?: DateLocalizer
    messageLanguage?: Messages
    message?: string
    onSelectEvent?: any
    eventPropGetter?: any
    defaultDate?: Date
    eventsProp?: any
    popup?: any
    formats?: any
    view?: View
    components?: Components
    onSelectSlot?: any
    selectable?: boolean
}) {
    const defaultLocalizer = momentLocalizer(moment)
    const messageLanguage: Messages = {
        date: 'Fecha',
        time: 'Horario',
        event: 'Evento',
        week: 'Semana',
        work_week: 'Semana de trabajo',
        day: 'Día',
        month: 'Mes',
        previous: 'Atrás',
        next: 'Después',
        today: 'Hoy',
        agenda: 'Agenda',
        showMore: (total: any) => `+${total} más`,
        noEventsInRange: 'No hay eventos en este rango',
    }

    const currentDate: Date = new Date()

    const { formats } = {
        formats: {
            dateFormat: (date: any, culture: any, localizer: any) =>
                localizer.format(date, 'D', culture),
        },
    }

    return (
        <Calendar
            culture={'es'}
            scrollToTime={props.scrollToTime}
            defaultView={props.defaultView}
            events={props.events}
            localizer={props.localizer ?? defaultLocalizer}
            messages={props.messageLanguage ?? messageLanguage}
            onSelectEvent={props.onSelectEvent}
            onSelectSlot={props.onSelectSlot}
            selectable={props.selectable}
            eventPropGetter={props.eventPropGetter}
            defaultDate={props.defaultDate ?? currentDate}
            popup
            formats={formats}
            view={props.view}
            components={props.components}
        />
    )
}
