'use client'

import React from 'react';
import Link from "next/link";
import { OTPAuthFlow } from './otp-auth-flow';

export default function SignIn() {
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