import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'
  const error = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')

  // Handle errors from Supabase
  if (error) {
    console.error('Auth error:', error, error_description)
    return NextResponse.redirect(
      `${requestUrl.origin}/auth/confirm?error=${encodeURIComponent(error_description || error)}`
    )
  }

  // Handle token_hash flow (from email links)
  if (token_hash && type) {
    try {
      const supabase = createRouteHandlerClient({ cookies })
      
      const { error: verifyError } = await supabase.auth.verifyOtp({
        token_hash,
        type: type as 'signup' | 'recovery' | 'invite' | 'email',
      })

      if (verifyError) {
        console.error('Verify OTP error:', verifyError)
        return NextResponse.redirect(
          `${requestUrl.origin}/auth/confirm?error=${encodeURIComponent(verifyError.message)}`
        )
      }

      // Successfully verified - redirect to confirmation page then dashboard
      return NextResponse.redirect(`${requestUrl.origin}/auth/confirm?success=true&next=${next}`)
    } catch (err) {
      console.error('Unexpected error:', err)
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/confirm?error=${encodeURIComponent('Verification failed. Please try again.')}`
      )
    }
  }

  // Handle code flow (PKCE)
  if (code) {
    try {
      const supabase = createRouteHandlerClient({ cookies })
      
      const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (sessionError) {
        console.error('Session error:', sessionError)
        return NextResponse.redirect(
          `${requestUrl.origin}/auth/confirm?error=${encodeURIComponent(sessionError.message)}`
        )
      }

      if (!session?.user) {
        return NextResponse.redirect(
          `${requestUrl.origin}/auth/confirm?error=${encodeURIComponent('No session found')}`
        )
      }

      // Check if profile exists
      const { data: profile } = await supabase
        .from('user_profiles')
        .select()
        .eq('user_id', session.user.id)
        .single()

      if (!profile) {
        // Create profile if it doesn't exist
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: session.user.id,
            email: session.user.email,
            firstName: session.user.user_metadata?.full_name?.split(' ')[0] || '',
            lastName: session.user.user_metadata?.full_name?.split(' ')[1] || '',
          })

        if (profileError) {
          console.error('Profile creation error:', profileError)
        }
      }

      // Successfully authenticated - redirect to confirmation page
      return NextResponse.redirect(`${requestUrl.origin}/auth/confirm?success=true&next=${next}`)
    } catch (err) {
      console.error('Unexpected error:', err)
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/confirm?error=${encodeURIComponent('Authentication failed. Please try again.')}`
      )
    }
  }

  // No code or token_hash provided
  return NextResponse.redirect(
    `${requestUrl.origin}/auth/confirm?error=${encodeURIComponent('Invalid authentication link')}`
  )
}
