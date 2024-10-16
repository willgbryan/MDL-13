import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { stripe } from '@/lib/stripe'
import { getUserDetails } from '@/app/_data/user'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(req: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
    }
  })

  try {
    const user = await getUserDetails()
    if (!user) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 })
    }

    const { data: existingRecord, error: checkError } = await supabase
      .from('stripe_records')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError
    }

    let stripeCustomerId: string

    if (existingRecord?.stripe_customer_id) {
      stripeCustomerId = existingRecord.stripe_customer_id
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: user.id },
      })

      stripeCustomerId = customer.id

      const { error: insertError } = await supabase
        .from('stripe_records')
        .insert([
          { user_id: user.id, stripe_customer_id: stripeCustomerId }
        ])

      if (insertError) throw insertError
    }

    return NextResponse.json({
      message: 'Stripe customer ID retrieved/created successfully',
      stripeCustomerId
    }, { status: 200 })

  } catch (error) {
    console.error('Error managing Stripe customer ID:', error)
    return NextResponse.json({ message: 'Error managing Stripe customer ID' }, { status: 500 })
  }
}