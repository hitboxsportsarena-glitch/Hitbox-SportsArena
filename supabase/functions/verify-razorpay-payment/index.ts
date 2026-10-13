import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from 'https://deno.land/std@0.193.0/crypto/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(
        JSON.stringify({ error: 'Missing required payment details' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get Razorpay secret key
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET')!

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`
    const encoder = new TextEncoder()
    const keyData = encoder.encode(razorpayKeySecret)
    const messageData = encoder.encode(text)
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData)
    const generatedSignature = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    const isValidSignature = generatedSignature === razorpay_signature

    if (!isValidSignature) {
      // Update payment as failed
      await supabase
        .from('payments')
        .update({
          payment_status: 'failed',
          registration_status: 'payment_failed',
          error_message: 'Invalid payment signature',
          updated_at: new Date().toISOString()
        })
        .eq('razorpay_order_id', razorpay_order_id)

      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Payment verification failed. Invalid signature.' 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Fetch payment from Razorpay to get additional details
    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID')!
    const auth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`)
    
    const paymentDetailsResponse = await fetch(
      `https://api.razorpay.com/v1/payments/${razorpay_payment_id}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`,
        },
      }
    )

    let paymentDetails = null
    if (paymentDetailsResponse.ok) {
      paymentDetails = await paymentDetailsResponse.json()
    }

    // Update payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .update({
        razorpay_payment_id,
        razorpay_signature,
        payment_status: 'paid',
        registration_status: 'confirmed',
        updated_at: new Date().toISOString()
      })
      .eq('razorpay_order_id', razorpay_order_id)
      .select('team_id')
      .single()

    if (paymentError) {
      console.error('Failed to update payment:', paymentError)
      return new Response(
        JSON.stringify({ error: 'Failed to update payment record' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Update team registration status
    await supabase
      .from('teams')
      .update({ 
        registration_status: 'confirmed',
        updated_at: new Date().toISOString()
      })
      .eq('id', payment.team_id)

    // Get complete registration details
    const { data: registrationDetails } = await supabase
      .from('teams')
      .select(`
        *,
        tournaments (
          name,
          venue,
          start_date
        ),
        team_players (
          player_name,
          role
        ),
        payments (
          id,
          amount,
          razorpay_payment_id,
          payment_status,
          registration_status
        )
      `)
      .eq('id', payment.team_id)
      .single()

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Payment verified successfully',
        registration: registrationDetails
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error in verify-razorpay-payment:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
