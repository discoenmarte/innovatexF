'use client'

import { Button } from '../components/ui/button';
import { signIn } from 'next-auth/react';
import { useSessionValidation } from '../hooks/auth/useSessionValidation';
import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { options } from '../config/particles';
import { LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const _ = useSessionValidation();
    const router = useRouter();
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            initParticlesEngine(async (engine) => {
                await loadSlim(engine);
            }).then(() => {
                setInit(true);
            });
        }
    }, []);

    const handleSignUp = () => {
        if (router) {
            router.push('/signup');
        }
    };

    return (
        <main className="flex min-h-screen flex-col p-10">
            <Particles className="absolute" id="tsparticles" options={options} />
            <header className="flex-1 flex flex-col gap-6 justify-center items-center relative z-10 text-white">
                <h1 className="text-5xl font-bold">InnovateX</h1>
                <h2 className="text-3xl justify-center items-center">
                La plataforma definitiva para empresas que desean crecer y ser rentables
                </h2>
                <p className="text-xl max-w-3xl text-center justify-center items-center">

                MentorIA basada en métodos de empresarios exitosos, junto con asistentes de IA para múltiples tareas operativas. Con InnovateX, enfócate en innovar y alcanzar el éxito global.
                </p>
                <aside className="flex gap-4">
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
                    <Button
                        className="flex gap-2 text-xl"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </Button>
                </aside>
            </header>
        </main>
    );
}
