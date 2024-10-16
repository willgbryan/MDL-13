'use server'

import { stripe } from '@/lib/stripe'
import { createClient } from '@/db/server'
import { cookies } from 'next/headers'

export async function createStripePortalSession(stripeCustomerId: string) {
  if (!stripeCustomerId) {
    throw new Error('Stripe customer ID is required')
  }
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `https://mdl-13.com/pricing`,
    })
    return { url: session.url }
  } catch (error) {
    console.error('Error creating Stripe portal session:', error)
    throw new Error('Failed to create Stripe portal session')
  }
}

export async function checkWeeklyPayment(stripeCustomerId: string, weekNumber: number) {
  try {
    const charges = await stripe.charges.list({
      customer: stripeCustomerId,
      limit: 100,
    });

    return charges.data.some(charge => 
      charge.metadata.weekNumber == weekNumber.toString() && 
      charge.status === 'succeeded'
    );
  } catch (error) {
    console.error('Error checking weekly payment:', error)
    return false
  }
}

export async function checkSeasonPayment(stripeCustomerId: string, season: string) {
  try {
    const charges = await stripe.charges.list({
      customer: stripeCustomerId,
      limit: 100,
    });

    return charges.data.some(charge => 
      charge.metadata.season === season && 
      charge.status === 'succeeded'
    );
  } catch (error) {
    console.error('Error checking season payment:', error)
    return false
  }
}

export async function getUserPaymentStatus(stripeCustomerId: string) {
  try {
    const charges = await stripe.charges.list({
      customer: stripeCustomerId,
      limit: 1,
    });

    if (charges.data.length > 0) {
      const latestCharge = charges.data[0];
      return {
        id: latestCharge.id,
        amount: latestCharge.amount,
        currency: latestCharge.currency,
        status: latestCharge.status,
        created: new Date(latestCharge.created * 1000).toISOString(),
        description: latestCharge.description,
        metadata: latestCharge.metadata,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user payment status:', error)
    return null
  }
}

export async function getStripeCustomerId(userId: string) {
  const supabase = createClient(cookies())
  
  const { data, error } = await supabase
    .from('users')
    .select('stripe_customer_id')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching Stripe customer ID:', error)
    return null
  }

  return data?.stripe_customer_id
}