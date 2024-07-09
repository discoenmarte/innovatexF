import { EventProps } from 'react-big-calendar'

export type CalendarEvent = {
    start: Date
    end: Date
    title: string
}

export type CalenderEventProps = EventProps & {}
