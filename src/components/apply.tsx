'use client'

import React, { FormEvent, useState } from 'react'
import Link from "next/link"
import { Icon3dCubeSphere } from "@tabler/icons-react"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Info } from 'lucide-react'
import { Textarea } from './ui/textarea'

export function Apply() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 bg-gradient-to-bl dark:from-neutral-700 dark:to-neutral-900">
      <Form />
    </div>
  );
}

function Form() {
  const [message, setMessage] = useState<string>('')
  const [formSuccess, setFormSuccess] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submitted form");
    // Here you would typically handle the form submission
    // For now, let's just set a success message
    setFormSuccess(true);
    setMessage('Application submitted successfully!')
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md px-4 py-8 bg-white dark:bg-transparent shadow-lg rounded-md">
      <div className="mx-auto w-full">
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-black dark:text-white text-center mb-8">
          MDL-13 Application
        </h2>

        {message && (
          <Alert variant={formSuccess ? 'default' : 'destructive'} className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>{formSuccess ? 'Success' : 'Error'}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-neutral-700 dark:text-white">Full name</Label>
            <Input
              id="name"
              type="text"
              placeholder="OBJ"
              className="w-full bg-[#e4e4e4] text-black dark:bg-neutral-800 dark:text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="earnings" className="text-neutral-700 dark:text-white">Lifetime sports betting earnings</Label>
            <Input
              id="earnings"
              type="number"
              placeholder="10000"
              className="w-full bg-[#e4e4e4] text-black dark:bg-neutral-800 dark:text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="dev" className="text-neutral-700 dark:text-white">Would you consider yourself a developer?</Label>
            <Input
              id="dev"
              type="text"
              placeholder="No"
              className="w-full bg-[#e4e4e4] text-black dark:bg-neutral-800 dark:text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-neutral-700 dark:text-white">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="nota1catch1der@gmail.com"
              className="w-full bg-[#e4e4e4] text-black dark:bg-neutral-800 dark:text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="why" className="text-neutral-700 dark:text-white">Tell us about yourself...</Label>
            <Textarea
              id="why"
              placeholder=""
              className="block w-full px-4 rounded-md py-1.5 shadow-sm text-black placeholder:text-gray-400 sm:text-sm sm:leading-6 dark:bg-neutral-800 dark:text-white"
              required
            />
          </div>

          <Button variant="ghost" type="submit" className="w-full text-black rounded-full bg-white hover:text-stone-100 hover:bg-stone-900 dark:bg-white hover:text-stone-100 hover:dark:bg-neutral-800">
            Apply
          </Button>
        </div>

        <p className="text-neutral-600 dark:text-neutral-400 text-sm text-center mt-8">
          By clicking on apply, you agree to our{" "}
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