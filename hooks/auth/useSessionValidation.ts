import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useSessionValidation = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (status === 'unauthenticated') {
                router.push('/');
            } else if (status === 'authenticated' && pathname === '/') {
                router.push('/admin');
            }
        }
    }, [session, status, pathname, router]);

    return session?.user;
};