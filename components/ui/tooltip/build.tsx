import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '.'

interface BuildTooltip {
	trigger: any
	content: string
}

export default function BuildTooltip(props: BuildTooltip) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{props.trigger}</TooltipTrigger>
				<TooltipContent>{props.content}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
