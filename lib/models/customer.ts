export interface Account {
    id: string
    nit: string
    ref: string
    tenant: Tenant
    city: string
    department: string
    tenant_domain: string
    payment_method: null
    responsible_billing: string
    billing_address: string
    electronic_billing: boolean
    phone: string
    email: string
    licenses: number
    available: boolean
    modified: string
    created: string
}

export interface Tenant {
    schema_name: string
    name: string
    paid_until: string
    on_trial: boolean
    created_on: string
    is_active: boolean
}
