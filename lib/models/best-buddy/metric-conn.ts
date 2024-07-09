export interface BestBuddyConn {
    id: string
    customer_student_id: number
    student_name: string
    student_email: string
    headquarter: string
    program: string
    region: string
    created: string
    modified: string
}

export class BestBuddyConn implements BestBuddyConn {
    id: string
    customer_student_id: number
    student_name: string
    student_email: string
    headquarter: string
    program: string
    region: string
    created: string
    modified: string

    constructor(bestbuddyConn?: BestBuddyConn) {
        this.id = bestbuddyConn?.id ?? ''
        this.customer_student_id = bestbuddyConn?.customer_student_id ?? 0
        this.student_name = bestbuddyConn?.student_name ?? ''
        this.student_email = bestbuddyConn?.student_email ?? ''
        this.headquarter = bestbuddyConn?.headquarter ?? ''
        this.program = bestbuddyConn?.program ?? ''
        this.region = bestbuddyConn?.region ?? ''
        this.created = bestbuddyConn?.created ?? new Date().toISOString()
        this.modified = bestbuddyConn?.modified ?? new Date().toISOString()
    }
}
