import { LayoutDashboard, PersonStandingIcon } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface SideBarMenuItem {
    href: string
    title: string
    label: string
    icon: LucideIcon
}

export const SIDEBAR_LINKS: SideBarMenuItem[] = [
    {
        href: '/admin',
        title: 'Tablero',
        label: 'Dashboard',
        icon: LayoutDashboard,
    },

]
