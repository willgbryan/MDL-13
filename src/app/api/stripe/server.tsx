import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { CheckoutButton } from './client'
import { createClient } from '@/db/server'
import { cookies } from 'next/headers'

export async function StripeCheckout({
  price,
  className,
  children,
  metadata,
  paymentType,
  tierDescription,
}: {
  price: number
  className?: string
  children?: React.ReactNode
  metadata: { [name: string]: string | number | null }
  paymentType: 'subscription' | 'one-time'
  tierDescription: string
}) {
  async function createStripeSession() {
    'use server'
    const headersList = headers()
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('User not authenticated')
      }

      let { data: stripeRecord, error: recordError } = await supabase
        .from('stripe_record')
        .select('stripe_customer_id')
        .eq('user_id', session.user.id)
        .single()

      let customerId = stripeRecord?.stripe_customer_id

      if (!customerId) {
        const customer = await stripe.customers.create({
          email: session.user.email,
          metadata: { userId: session.user.id },
        })
        customerId = customer.id

        const { error: insertError } = await supabase
          .from('stripe_record')
          .insert({
            user_id: session.user.id,
            stripe_customer_id: customerId,
          })

        if (insertError) {
          throw new Error('Error inserting Stripe customer ID: ' + insertError.message)
        }
      }

      const stripeSession = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Subscription',
                description: tierDescription,
              },
              unit_amount: price,
              recurring: paymentType === 'subscription' ? { interval: 'month' } : undefined,
            },
            quantity: 1,
          },
        ],
        metadata: { ...metadata, userId: session.user.id },
        mode: paymentType === 'subscription' ? 'subscription' : 'payment',
        success_url: `${headersList.get('origin')}/chat`,
        cancel_url: `${headersList.get('origin')}/`,
      })

      return JSON.parse(JSON.stringify(stripeSession)) as Stripe.Response<Stripe.Checkout.Session>
    } catch (error) {
      console.error(`createStripeSession()`, error)
      throw error
    }
  }

  return (
    <CheckoutButton
      createStripeSession={createStripeSession}
      className={className}
      children={children}
    />
  )
}