import { MENTOR_QUESTIONS_API_URL } from '@/config/mentor'
import { APIService } from '..'
import { create, query, update, destroy } from '@/lib/actions'
import {
    MentorQuestions,
    MentorQuestionsResults,
} from '@/lib/models/mentor/questions'
import { NormalDistribution, ResponseNormal } from '@/types/metrics'

export class MentorQuestionsService implements APIService {
    public getAPIUrl() {
        return MENTOR_QUESTIONS_API_URL
    }

    public async fetchItems(params?: any): Promise<MentorQuestionsResults> {
        try {
            const response = await query(MENTOR_QUESTIONS_API_URL, params)
            return response
        } catch (err) {
            throw new Error(`Failed to fetch mentor questions data: ${err}`)
        }
    }

    public async fetchNormalDistStudentsData(
        params?: any
    ): Promise<ResponseNormal> {
        try {
            const response = await query('/metrics/normal_dist', params)
            return response
        } catch (err) {
            throw new Error(`Failed to fetch mentor questions data: ${err}`)
        }
    }

    public async createItem(data: any, config?: any): Promise<MentorQuestions> {
        try {
            const response = await create(
                MENTOR_QUESTIONS_API_URL,
                data,
                config
            )
            return response
        } catch (err) {
            throw new Error(`Failed to create mentor question: ${err}`)
        }
    }

    public async updateItem(
        data: MentorQuestions | Partial<MentorQuestions>,
        partial = true,
        config?: any
    ): Promise<MentorQuestions> {
        try {
            const response = await update(
                `${MENTOR_QUESTIONS_API_URL}/${data.id}/`,
                data,
                partial,
                config
            )
            return response
        } catch (err) {
            throw new Error(`Failed to update mentor question: ${err}`)
        }
    }

    public async destroyItem(id: string): Promise<void> {
        try {
            await destroy(`${MENTOR_QUESTIONS_API_URL}/${id}/`)
        } catch (err) {
            throw new Error(`Failed to destroy question data: ${err}`)
        }
    }
}
