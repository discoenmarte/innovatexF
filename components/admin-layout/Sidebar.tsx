'use client'

import { Brain } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { SIDEBAR_LINKS } from '@/config/sidebar'
import BuildTooltip from '../ui/tooltip/build'
import { usePathname } from 'next/navigation'
import { SideBarMenuItem } from '@/types/sidebar'

export default function Sidebar() {
    return (
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
            <div className="border-b p-2">
                <Button
                    className="text-primary hover:text-primary w-8 h-8 md:w-10 md:h-10"
                    variant="outline"
                    size="icon"
                    aria-label="Home"
                >
                    <Link href="/admin">
                        <Brain className="size-4 md:size-5" />
                    </Link>
                </Button>
            </div>
            <nav className="grid gap-1 p-2">
                {SIDEBAR_LINKS.map((link, index) => {
                    return (
                        <BuildTooltip
                            key={link.title}
                            trigger={SidebarItem(link)}
                            content={link.title}
                        ></BuildTooltip>
                    )
                })}
            </nav>
        </aside>
    )
}

function SidebarItem({ ...props }: SideBarMenuItem) {
    const pathname = usePathname()
    const LinkIcon = props.icon

    const getSection = (href: string) => {
        const splited = href.split('/')
        return splited[2]
    }
    const isActive =
        pathname === props.href
            ? true
            : pathname.split('/')[3] &&
              pathname.includes(getSection(props.href))

    return (
        <Link href={props.href}>
            <Button
                className={`${
                    isActive && 'bg-primary text-white'
                } rounded-lg w-8 h-8 md:w-10 md:h-10`}
                variant="ghost"
                size="icon"
                aria-label={props.label}
            >
                <LinkIcon className="size-4 md:size-5" />
            </Button>
        </Link>
    )
}
