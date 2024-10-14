import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(req: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
    }
  })

  try {
    const { name, email_address, earnings, dev, about } = await req.json()

    const { data: existingUser, error: checkError } = await supabase
      .from('open_applications')
      .select('email_address')
      .eq('email_address', email_address)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError
    }

    if (existingUser) {
      return NextResponse.json(
        { message: 'An application with this email already exists.' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('open_applications')
      .insert([
        { name, email_address, earnings, dev, about }
      ])

    if (error) throw error

    return NextResponse.json({ message: 'Application submitted successfully', data }, { status: 200 })
  } catch (error) {
    console.error('Error submitting application:', error)
    return NextResponse.json({ message: 'Error submitting application' }, { status: 500 })
  }
}