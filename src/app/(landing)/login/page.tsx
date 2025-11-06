'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ChefHat } from 'lucide-react';

const Login: React.FC = () => {
    const [isSigningIn, setIsSigningIn] = useState(false);

    const handleGoogleSignIn = async () => {
        try {
            setIsSigningIn(true);
            await signIn('google', { callbackUrl: '/post-login' });
        } catch (err) {
            console.error('Google sign-in failed:', err);
        } finally {
            setIsSigningIn(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-8">
                <ChefHat className="h-8 w-8 text-green-800" />
                <span className="text-2xl font-bold text-green-800">HeathlyPlate</span>
            </Link>

            {/* Heading */}
            <h1 className="text-3xl font-semibold text-green-900 mb-4">
                Welcome to HealthyPlate
            </h1>
            <p className="text-gray-600 mb-8 text-center max-w-md">
                Sign in to start customizing your health journey.
            </p>

            {/* Google Sign-In */}
            <button
                onClick={handleGoogleSignIn}
                disabled={isSigningIn}
                className="bg-white border border-green-700 text-green-800 px-6 py-3 rounded-md text-md font-medium hover:bg-green-100 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isSigningIn ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                    <FcGoogle size={22} />
                )}
                {isSigningIn ? 'Signing in...' : 'Sign In with Google'}
            </button>

        </div>
    );
};

export default Login;
