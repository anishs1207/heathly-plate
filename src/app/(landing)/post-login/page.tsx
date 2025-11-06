'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

export default function PostLogin() {
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            router.replace('/dashboard');
        }
    }, [status, router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-green-800">
            <Loader2 className="h-6 w-6 animate-spin mb-4" />
            <p className="text-lg">Logging you in...</p>
        </div>
    );
}
