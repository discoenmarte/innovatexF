'use client'

import { v4 as uuidv4 } from 'uuid'

export const genPathNavReload = (link: string) => {
	const path = `${link}?reload=${uuidv4()}`
	return path
}
