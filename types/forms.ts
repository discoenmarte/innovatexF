type CreateAction = 'create'
type UpdateAction = 'update'
export type FormAction = CreateAction | UpdateAction

export type CreateUpdateFormProps = {
    data: any
    action: FormAction
    showModal?: (open: boolean) => void
    fetchItems?: () => void
}

export type ValidationError = {
    [field: string]: string | null
}
