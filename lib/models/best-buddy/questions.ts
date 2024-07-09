import { ResponsePagination } from '../api-response'

export interface BestBuddyQuestions {
    id: string
    available: boolean
    created: string
    modified: string
    student_id: number
    customer_student_id: number
    student_name: string
    student_email: string
    questions: Question[]
    insights: string
    summary: string
    reminder: string
    mood: string
    headquarter: string
    program: string
    region: string
}

export interface Question {
    Prompt?: string
    Output?: string
}

export class BestBuddyQuestions implements BestBuddyQuestions {
    id: string
    available: boolean
    created: string
    modified: string
    student_id: number
    customer_student_id: number
    student_name: string
    student_email: string
    questions: Question[]
    insights: string
    summary: string
    reminder: string
    mood: string
    headquarter: string
    program: string
    region: string

    constructor(bestbuddyQuestions?: BestBuddyQuestions) {
        this.id = bestbuddyQuestions?.id ?? ''
        this.available = bestbuddyQuestions?.available ?? false
        this.created = bestbuddyQuestions?.created ?? ''
        this.modified = bestbuddyQuestions?.modified ?? ''
        this.student_id = bestbuddyQuestions?.student_id ?? 0
        this.customer_student_id = bestbuddyQuestions?.customer_student_id ?? 0
        this.student_name = bestbuddyQuestions?.student_name ?? ''
        this.student_email = bestbuddyQuestions?.student_email ?? ''
        this.questions = bestbuddyQuestions?.questions ?? []
        this.insights = bestbuddyQuestions?.insights ?? ''
        this.summary = bestbuddyQuestions?.summary ?? ''
        this.reminder = bestbuddyQuestions?.reminder ?? ''
        this.mood = bestbuddyQuestions?.mood ?? ''
        this.headquarter = bestbuddyQuestions?.headquarter ?? ''
        this.program = bestbuddyQuestions?.program ?? ''
        this.region = bestbuddyQuestions?.region ?? ''
    }
}

export interface BestBuddyQuestionsResults extends ResponsePagination {
    results: BestBuddyQuestions[]
}
