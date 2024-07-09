import { Loader2 } from 'lucide-react'

export default function Loader({ className }: { className?: string }) {
    return <Loader2 className={`${className} animate-spin`} />
}
