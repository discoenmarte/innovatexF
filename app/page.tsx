'use client'

import { Button } from '../components/ui/button'
import { signIn } from 'next-auth/react'
import { useSessionValidation } from '../hooks/auth/useSessionValidation'
import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { options } from '../config/particles'
import { LogIn } from 'lucide-react'

export default function Home() {
    const _ = useSessionValidation()

    const [init, setInit] = useState(false)

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine)
            //await loadBasic(engine);
        }).then(() => {
            setInit(true)
        })
    }, [])

    return (
        <main className="flex min-h-screen flex-col p-10">
            <Particles
                className="absolute"
                id="tsparticles"
                options={options}
            />
            <header className="flex-1 flex flex-col gap-6 justify-center items-center relative z-10  text-white">
                <h1 className="text-5xl font-bold">InnovateX</h1>
                <h2 className="text-3xl">
                    Expert AI Assistants to Entrepreneurs
                </h2>
                <p className="text-xl max-w-3xl text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloribus voluptas iure nisi facilis et cum est ducimus!
                    Quis velit minima corrupti ex, aliquam illo, nihil in est
                    libero voluptas tempore?
                </p>
                <aside className="flex  gap-4">
                    <Button
                        className="flex gap-2 text-xl"
                        onClick={() =>
                            signIn(undefined, {
                                callbackUrl: '/admin',
                            })
                        }
                    >
                        Sign In
                        <LogIn size={24} />
                    </Button>
                </aside>
            </header>
        </main>
    )
}
