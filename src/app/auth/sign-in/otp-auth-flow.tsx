"use client"

import React, { FormEvent, useState } from 'react';
import { AuthApiError } from '@supabase/supabase-js';
import { Info, MailOpenIcon} from 'lucide-react';
import { z, ZodError } from 'zod';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthUserSchema } from '@/lib/auth-validation/validationSchema';
import { formatError } from '@/lib/error';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSupabase } from '@/app/supabase-provider';
import { Icon3dCubeSphere } from '@tabler/icons-react';
import router from 'next/router';

type FormData = z.infer<typeof AuthUserSchema>;

function InputErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
      {children}
    </span>
  );
}

export function OTPAuthFlow() {
  const { supabase } = useSupabase();
  const [errors, setErrors] = useState<FormData>();
  const [message, setMessage] = useState<string>('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showAuthCode, setShowAuthCode] = useState(false);

  const handleSendOTP = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSuccess(false);
    setErrors(undefined);
    setMessage('');
  
    try {
      AuthUserSchema.parse({ email });
    } catch (err) {
      if (err instanceof ZodError) {
        const errs = formatError(err) as FormData;
        setErrors(errs);
        return;
      }
    }
    
    const whitelistResponse = await fetch('/api/check-whitelist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const whitelistResult = await whitelistResponse.json();

    if (!whitelistResult.isWhitelisted) {
      setMessage('Please apply for access.');
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${new URL(location.href).origin}/auth/callback?next=picks`,
        shouldCreateUser: true,
        data: {
          signInMethod: 'otp'
        }
      },
    });
  
    if (error) {
      setMessage(`Error: ${error.message}`);
      return;
    }
  
    setIsOtpSent(true);
    setFormSuccess(true);
    setMessage('Please check your email for a sign in code.');
  };

  const handleVerifyOTP = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormSuccess(false)

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email'
    })

    if (error) {
      setMessage(error.message)
      return
    }

    setFormSuccess(true)
    setMessage('Successfully verified. Redirecting..')
  }

  const handleAuthCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSuccess(false);
    setMessage('Verifying auth code...');
    
    // Here you would typically send the authCode to your backend for verification
    // For this example, we'll just simulate a successful verification
    setTimeout(() => {
      setFormSuccess(true);
      setMessage('Auth code verified successfully. Redirecting...');
      // Here you can redirect the user or update the UI as needed
    }, 2000);
  };

  return (
    <div className="max-w-md">
      {message && (
        <Alert variant={formSuccess ? 'default' : 'destructive'} className="mb-8 bg-transparent border-[#4BFFBA]">
          {formSuccess ? (
            <MailOpenIcon className="h-4 w-4 stroke-[#4BFFBA]" />
          ) : (
            <Info className="h-4 w-4 text-violet-200" />
          )}
          <AlertTitle>{formSuccess ? 'Success' : 'Error'}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      {!isOtpSent && !showAuthCode ? (
        <>
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <Label className="text-white font-normal mb-4" htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#e4e4e4] text-black dark:bg-neutral-800 dark:text-white"
                required
              />
            </div>
            {errors?.email && <InputErrorMessage>{errors.email}</InputErrorMessage>}
            <Button variant="ghost" type="submit" className="w-full text-black rounded-full bg-white hover:text-stone-100 hover:dark:bg-neutral-800">
              Sign In
            </Button>
          </form>
          <div className="mt-8 relative">
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="px-6 text-neutral-400 dark:text-neutral-500">
              Or continue with
            </span>
          </div>
        </div>
          <div className="mt-6">
            <button
              onClick={() => setShowAuthCode(true)}
              className="w-full bg-black hover:bg-black/90 text-black text-sm font-medium rounded-full px-4 py-2 transition duration-200 flex items-center justify-center dark:bg-white hover:text-stone-100 hover:dark:bg-neutral-800"
            >
              <Icon3dCubeSphere className="h-5 w-5 mr-2" />
              <span>Auth Code</span>
            </button>
          </div>
        </>
      ) : isOtpSent ? (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div className="flex flex-col items-center">
            <Label htmlFor="otp" className="self-start mb-2 text-white">OTP</Label>
            <div className="flex justify-center w-full text-white">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className='border-neutral-600'/>
                  <InputOTPSlot index={1} className='border-neutral-600'/>
                  <InputOTPSlot index={2} className='border-neutral-600'/>
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} className='border-neutral-600'/>
                  <InputOTPSlot index={4} className='border-neutral-600'/>
                  <InputOTPSlot index={5} className='border-neutral-600'/>
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <Button variant="ghost" type="submit" className="w-full mt-12 text-black rounded-full bg-white hover:text-stone-100 hover:dark:bg-neutral-800">
            Verify OTP
          </Button>
        </form>
      ) : (
        <form onSubmit={handleAuthCode} className="space-y-4">
          <div className="flex flex-col items-center">
            <Label htmlFor="authCode" className="self-start ml-3 mb-2 text-white">Auth Code</Label>
            <div className="flex justify-center w-full text-white">
              <InputOTP
                maxLength={9}
                value={authCode}
                onChange={setAuthCode}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className='border-neutral-600'/>
                  <InputOTPSlot index={1} className='border-neutral-600'/>
                  <InputOTPSlot index={2} className='border-neutral-600'/>
                </InputOTPGroup>
                <div className="space-x-4"></div>
                <InputOTPGroup>
                  <InputOTPSlot index={3} className='border-neutral-600'/>
                  <InputOTPSlot index={4} className='border-neutral-600'/>
                  <InputOTPSlot index={5} className='border-neutral-600'/>
                </InputOTPGroup>
                <div className="space-x-4"></div>
                <InputOTPGroup>
                  <InputOTPSlot index={6} className='border-neutral-600'/>
                  <InputOTPSlot index={7} className='border-neutral-600'/>
                  <InputOTPSlot index={8} className='border-neutral-600'/>
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <Button variant="ghost" type="submit" className="w-full mt-4 text-black rounded-full bg-white hover:text-stone-100 hover:dark:bg-neutral-800">
            Verify Auth Code
          </Button>
        </form>
      )}
    </div>
  );
}