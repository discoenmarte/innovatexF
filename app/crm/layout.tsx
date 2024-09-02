import Sidebar from '@/components/admin-layout/Sidebar'
import Header from '@/components/admin-layout/Header'

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main>
            <div className="grid h-full w-full pl-[3rem]  md:pl-[3.5rem]">
                <Sidebar />
                <div className="flex flex-col">
                    <Header />
                    <section className="grid flex-1 gap-4 overflow-auto p-4 bg-accent">
                        {children}
                    </section>
                </div>
            </div>
        </main>
    )
}
