import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '.'

export default function BuildDialog({
    ...props
}: {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    title?: string
    description?: string
    content?: React.ReactNode | string
    footer?: React.ReactNode | string
    className?: string
    trigger?: React.ReactNode
}) {
    return (
        <Dialog {...props}>
            <DialogTrigger asChild>{props.trigger}</DialogTrigger>
            <DialogContent className={props.className}>
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                    <DialogDescription>{props.description}</DialogDescription>
                </DialogHeader>
                {props.content && props.content}
                {props.footer && <DialogFooter>{props.footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    )
}
