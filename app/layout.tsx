import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import '../styles/globals.css'
import { cn } from '@/lib/utils'
import { SProvider } from './providers'
import { Toaster } from '@/components/ui/toaster'

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
})

export const metadata: Metadata = {
    title: 'InnovateX',
    description: '',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    'min-h-screen bg-accent/10 font-sans antialiased',
                    fontSans.variable
                )}
            >
                <SProvider>
                    <div className="grid h-screen w-full">{children}</div>
                </SProvider>
                <Toaster />
            </body>
        </html>
    )
}
