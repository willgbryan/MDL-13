import React from 'react';
import Link from "next/link";
import { OTPAuthFlow } from './otp-auth-flow';
import { redirect } from 'next/navigation';
import { getSession } from '@/app/_data/user';

function getBaseUrl(): string {
  const deployment = process.env.DEPLOYMENT
  if (deployment === "PROD") {
    return 'https://mdl-13.com'
  } else if (deployment === "DEV") {
    return ''
  } else {
    return process.env.NEXT_PUBLIC_BASE_URL || 'https://mdl-13.com'
  }
}

// const title = "MDL-13"
// const description = "Machine Learning for Sports Analytics"
// const imageUrl = "https://i.pinimg.com/236x/3f/ca/ef/3fcaefeeac6a0d6d728048fdd3685918.jpg"
// const canonicalUrl = "https://mdl-13.com"
const baseUrl = getBaseUrl()
export default async function SignIn() {

  const session = await getSession()
  if (session) {
    return redirect(`${baseUrl}/picks`)
  }
  
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 bg-gradient-to-bl dark:from-neutral-700 dark:to-neutral-900">
      <Form />
    </div>
  );
}

function Form() {
  return (
    <div className="w-full max-w-md px-4 py-8 bg-white dark:bg-transparent shadow-lg rounded-md">
      <div className="mx-auto w-full">
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-black dark:text-white text-center mb-8">
          Login
        </h2>

        <OTPAuthFlow />

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
      </div>
    </div>
  );
}