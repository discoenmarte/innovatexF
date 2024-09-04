'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import CryptoJS from 'crypto-js'

export default function crmView() {
    return (
        <section className="flex flex-1 flex-col gap-4 md:p-4 lg:p-6 lg:gap-6" style={{ height: '100vh' }}>
            <article className="grid gap-4">
                <div className="flex items-center justify-between">
                <h1>CRM view</h1>
                </div>
            </article>

            <div className="flex justify-center items-center h-full">
                {/* Removed iframe */}
            </div>
        </section>
    )
}
