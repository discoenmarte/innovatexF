import { BEST_BUDDY_API_URL } from '@/config/best-buddy'
import { APIService } from '..'
import { create, query, update, destroy } from '@/lib/actions'
import {
    BestBuddyQuestions,
    BestBuddyQuestionsResults,
} from '@/lib/models/best-buddy/questions'

export class BestBuddyQuestionsService implements APIService {
    public getAPIUrl() {
        return BEST_BUDDY_API_URL
    }

    public async fetchItems(params?: any): Promise<BestBuddyQuestionsResults> {
        try {
            const response = await query(BEST_BUDDY_API_URL, params)
            return response
        } catch (err) {
            throw new Error(`Failed to fetch best buddy questions data: ${err}`)
        }
    }

    public async createItem(
        data: any,
        config?: any
    ): Promise<BestBuddyQuestions> {
        try {
            const response = await create(BEST_BUDDY_API_URL, data, config)
            return response
        } catch (err) {
            throw new Error(`Failed to create best buddy question: ${err}`)
        }
    }

    public async updateItem(
        data: BestBuddyQuestions | Partial<BestBuddyQuestions>,
        partial = true,
        config?: any
    ): Promise<BestBuddyQuestions> {
        try {
            const response = await update(
                `${BEST_BUDDY_API_URL}/${data.id}/`,
                data,
                partial,
                config
            )
            return response
        } catch (err) {
            throw new Error(`Failed to update best buddy question: ${err}`)
        }
    }

    public async destroyItem(id: string): Promise<void> {
        try {
            await destroy(`${BEST_BUDDY_API_URL}/${id}/`)
        } catch (err) {
            throw new Error(`Failed to destroy question data: ${err}`)
        }
    }
}
