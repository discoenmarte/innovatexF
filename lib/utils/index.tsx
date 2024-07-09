import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Convert } from './convert'
import { capitalize } from './formatter'
import { generateRefSlug } from './refgen'

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export { cn, Convert, capitalize, generateRefSlug }
