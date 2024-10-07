"use client"

import React from 'react';
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconBrandGithub } from "@tabler/icons-react";

export function Login() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
      <Form />
    </div>
  );
}

function Form() {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submitted form");
  }

  return (
    <form className="w-full max-w-md px-4 py-8 bg-white dark:bg-neutral-900 shadow-lg border rounded-md" onSubmit={onSubmit}>
      <div className="mx-auto w-full">
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-black dark:text-white text-center mb-8">
          Sign up for an account
        </h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400">
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="mt-2 block w-full px-4 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 sm:text-sm sm:leading-6 dark:bg-neutral-800 dark:ring-neutral-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="hello@example.com"
              className="mt-2 block w-full px-4 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 sm:text-sm sm:leading-6 dark:bg-neutral-800 dark:ring-neutral-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-2 block w-full px-4 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 sm:text-sm sm:leading-6 dark:bg-neutral-800 dark:ring-neutral-700 dark:text-white"
            />
          </div>

          <button className="w-full bg-black hover:bg-black/90 text-white text-sm font-medium rounded-full px-4 py-2 transition duration-200 dark:bg-white dark:text-black dark:hover:bg-neutral-100">
            Sign Up
          </button>
        </div>

        <p className={cn("text-sm text-neutral-600 text-center mt-4 dark:text-neutral-400")}>
          Already have an account?{" "}
          <Link href="#" className="text-black dark:text-white">
            Sign in
          </Link>
        </p>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-neutral-300 dark:border-neutral-700" />
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-white px-6 text-neutral-400 dark:text-neutral-500 dark:bg-neutral-900">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => {}}
            className="w-full bg-black hover:bg-black/90 text-white text-sm font-medium rounded-full px-4 py-2 transition duration-200 flex items-center justify-center dark:bg-white dark:text-black dark:hover:bg-neutral-100"
          >
            <IconBrandGithub className="h-5 w-5 mr-2" />
            <span>Github</span>
          </button>
        </div>

        <p className="text-neutral-600 dark:text-neutral-400 text-sm text-center mt-8">
          By clicking on sign up, you agree to our{" "}
          <Link href="#" className="text-neutral-500 dark:text-neutral-300">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-neutral-500 dark:text-neutral-300">
            Privacy Policy
          </Link>
        </p>
      </div>
    </form>
  );
}