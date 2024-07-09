import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '.'

export default function BuildCard({
    ...props
}: {
    title?: string
    description?: React.ReactNode | string
    content?: React.ReactNode | string
    footer?: React.ReactNode | string
    className?: string
}) {
    return (
        <Card className={`${props.className}`}>
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
            </CardHeader>
            {props.content && <CardContent>{props.content}</CardContent>}
            {props.footer && <CardFooter>{props.footer}</CardFooter>}
        </Card>
    )
}
