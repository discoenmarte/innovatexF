'use client'

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface Props {
	children: ReactNode
}

export const SProvider = ({ children }: Props) => {
	return <SessionProvider>{children}</SessionProvider>
}
