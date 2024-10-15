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
    const { email } = await req.json()

    const { data, error } = await supabase
      .from('whitelist')
      .select('email_address')
      .eq('email_address', email)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    if (data) {
      return NextResponse.json({ isWhitelisted: true }, { status: 200 })
    } else {
      return NextResponse.json({ isWhitelisted: false }, { status: 200 })
    }
  } catch (error) {
    console.error('Error checking whitelist:', error)
    return NextResponse.json({ message: 'Error checking whitelist' }, { status: 500 })
  }
}