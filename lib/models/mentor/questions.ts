import { ResponsePagination } from '../api-response'

export interface MentorQuestions {
    id: string
    available: boolean
    created: string
    modified: string
    customer_student_id: number
    student_id: number
    student_name: string
    student_email: string
    course_slug: string
    course_id: number
    course_name: string
    section_id: number
    section_name: string
    questions: Question[]
    insights: string
    reminder: string
    mood: string
    summary: string
    time_slides: number
    time_mind_maps: number
    time_text: number
    time_no_text: number
    time_zoom_screen: number
    time_dead: number
    time_total: number
    gamification_points_time: number[]
    gamification_points_section: number
    grade: number
    region: string
    program: string
    headquarter: string
}

export interface Question {
    Output?: string
    Prompt?: string
}

export class MentorQuestions implements MentorQuestions {
    id: string
    available: boolean
    created: string
    modified: string
    customer_student_id: number
    student_id: number
    student_name: string
    student_email: string
    course_slug: string
    course_id: number
    course_name: string
    section_id: number
    section_name: string
    questions: Question[]
    insights: string
    reminder: string
    mood: string
    summary: string
    time_slides: number
    time_mind_maps: number
    region: string
    program: string
    headquarter: string

    constructor(mentorQuestions?: MentorQuestions) {
        this.id = mentorQuestions?.id ?? ''
        this.available = mentorQuestions?.available ?? false
        this.created = mentorQuestions?.created ?? new Date().toISOString()
        this.modified = mentorQuestions?.modified ?? new Date().toISOString()
        this.customer_student_id = mentorQuestions?.customer_student_id ?? 0
        this.student_id = mentorQuestions?.student_id ?? 0
        this.student_name = mentorQuestions?.student_name ?? ''
        this.student_email = mentorQuestions?.student_email ?? ''
        this.course_slug = mentorQuestions?.course_slug ?? ''
        this.course_id = mentorQuestions?.course_id ?? 0
        this.course_name = mentorQuestions?.course_name ?? ''
        this.section_id = mentorQuestions?.section_id ?? 0
        this.section_name = mentorQuestions?.section_name ?? ''
        this.questions = mentorQuestions?.questions ?? []
        this.insights = mentorQuestions?.insights ?? ''
        this.reminder = mentorQuestions?.reminder ?? ''
        this.mood = mentorQuestions?.mood ?? ''
        this.summary = mentorQuestions?.summary ?? ''
        this.time_slides = mentorQuestions?.time_slides ?? 0
        this.time_mind_maps = mentorQuestions?.time_mind_maps ?? 0
        this.region = mentorQuestions?.region ?? ''
        this.program = mentorQuestions?.program ?? ''
        this.headquarter = mentorQuestions?.headquarter ?? ''
    }
}

export interface MentorQuestionsResults extends ResponsePagination {
    results: MentorQuestions[]
}
