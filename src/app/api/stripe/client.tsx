// Set the script to run in client-side context
'use client'

// Import necessary hooks from React
import { useState } from 'react'
// Import Stripe.js functions and type definitions
import { loadStripe, Stripe as StripeClient } from '@stripe/stripe-js'
import { toast } from 'sonner'
import type S from 'stripe'

import { Button } from '@/components/ui/button'

// Initialize stripePromise to hold the loaded Stripe instance
let stripePromise: Promise<StripeClient | null>

// Function to load and return the Stripe instance, or return the existing instance if already loaded
const getStripe = () => {
  // Check if the stripePromise is not already set
  if (!stripePromise) {
    // Load Stripe with the publishable key and assign the resulting promise to stripePromise
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  // Return the promise which will resolve to the Stripe instance
  return stripePromise
}

export function CheckoutButton(props: {
  // Function to create a Stripe Checkout session
  createStripeSession(): Promise<S.Response<S.Checkout.Session> | undefined>
  className?: string
  children?: React.ReactNode
}) {
  // State to manage the loading status of the button
  const [loading, setLoading] = useState(false)
  
  return (
    <Button
      className="w-full mt-10 bg-[#4BFFBA]"
      onClick={async () => {
        setLoading(true)
        // Await the creation of a Stripe Checkout session
        const session = await props.createStripeSession()

        // <TODO>Bring this back in after payment is integrated</TODO>
        // // Alert and exit function if session creation fails
        // // if (!session) {
        // //   toast.error('Could not create stripe session')
        // //   return
        // // }

        if (!session){
          toast.message('Everything is free for now!')
          return
        }

        // Await the loading of the Stripe instance
        const stripe = await getStripe()
        // Alert and exit function if Stripe fails to load
        if (!stripe) {
          toast.error('Could not load stripe')
          return
        }

        // Redirect to Stripe's checkout page and catch any errors
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        })

        // Alert if there is an error in redirecting to checkout
        if (error) {
          toast.error(error.message)
        }
      }}
      disabled={loading}
    >
      Get started
      <div className="">
      
      </div>
      {/* {props.children ?? "Upgrade"} */}
    </Button>
  )
}
