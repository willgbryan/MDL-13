import React from 'react';
import { redirect } from 'next/navigation';
import Link from "next/link";
import { Icon3dCubeSphere } from "@tabler/icons-react";
import { Card, CardContent } from '@/components/ui/card';
import { OTPAuthFlow } from './otp-auth-flow';
import { getSession } from '@/app/_data/user';

function getBaseUrl(): string {
  const deployment = process.env.DEPLOYMENT;
  if (deployment === "PROD") {
    return 'https://mdl-13.vercel.app';
  } else if (deployment === "DEV") {
    return '';
  } else {
    return process.env.NEXT_PUBLIC_BASE_URL || 'https://mdl-13.vercel.app';
  }
}

const title = "MDL-13";
const description = "Machine learning for sport analytics";
const imageUrl = "";
const canonicalUrl = "https://mdl-13.vercel.app";
const baseUrl = getBaseUrl();

export default async function SignIn() {
  const session = await getSession();
  
  if (session) {
    redirect(`${baseUrl}/chat`);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-neutral-900">
      {/* Header */}
      <header className="w-full p-4 bg-white dark:bg-neutral-800 shadow">
        <div className="container mx-auto">
          <h1 className="text-2xl font-light text-black dark:text-white">MDL-13</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md bg-white dark:bg-neutral-800 shadow-lg border rounded-md">
          <CardContent className="px-6 py-8">
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-black dark:text-white text-center mb-8">
              Sign In
            </h2>
            
            <OTPAuthFlow />

            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-neutral-300 dark:border-neutral-700" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-neutral-400 dark:text-neutral-500 dark:bg-neutral-800">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                className="w-full bg-black hover:bg-black/90 text-white text-sm font-medium rounded-full px-4 py-2 transition duration-200 flex items-center justify-center dark:bg-white dark:text-black dark:hover:bg-neutral-100"
              >
                <Icon3dCubeSphere className="h-5 w-5 mr-2" />
                <span>Auth Code</span>
              </button>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 text-sm text-center mt-8">
              By clicking on sign in, you agree to our{" "}
              <Link href="#" className="text-neutral-500 dark:text-neutral-300">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-neutral-500 dark:text-neutral-300">
                Privacy Policy
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: imageUrl }],
    url: canonicalUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};