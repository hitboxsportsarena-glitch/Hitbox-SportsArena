import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    const { teamId, amount } = await req.json()

    if (!teamId || !amount) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: teamId and amount' }),
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

    // Verify team exists and get details
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('*, tournaments(entry_fee, name)')
      .eq('id', teamId)
      .single()

    if (teamError || !team) {
      return new Response(
        JSON.stringify({ error: 'Team not found' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Check if there's already a pending payment
    const { data: existingPayment } = await supabase
      .from('payments')
      .select('*')
      .eq('team_id', teamId)
      .in('payment_status', ['pending', 'processing'])
      .single()

    if (existingPayment) {
      return new Response(
        JSON.stringify({ 
          error: 'A payment is already in progress for this team',
          orderId: existingPayment.razorpay_order_id 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Get Razorpay credentials from environment
    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID')!
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET')!

    // Create Razorpay order
    const orderAmount = Math.round(amount * 100) // Convert to paise
    const orderData = {
      amount: orderAmount,
      currency: 'INR',
      receipt: `team_${teamId}_${Date.now()}`,
      notes: {
        team_id: teamId,
        team_name: team.team_name,
        captain_name: team.captain_name,
        tournament_name: team.tournaments?.name || 'N/A'
      }
    }

    const auth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`)
    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })

    if (!razorpayResponse.ok) {
      const errorData = await razorpayResponse.json()
      console.error('Razorpay order creation failed:', errorData)
      return new Response(
        JSON.stringify({ error: 'Failed to create payment order' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const razorpayOrder = await razorpayResponse.json()

    // Store payment record in database
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        team_id: teamId,
        razorpay_order_id: razorpayOrder.id,
        amount: amount,
        currency: 'INR',
        payment_status: 'pending',
        registration_status: 'pending_payment'
      })
      .select()
      .single()

    if (paymentError) {
      console.error('Failed to store payment record:', paymentError)
      return new Response(
        JSON.stringify({ error: 'Failed to store payment record' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Update team status
    await supabase
      .from('teams')
      .update({ registration_status: 'pending_payment' })
      .eq('id', teamId)

    return new Response(
      JSON.stringify({
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        paymentId: payment.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error in create-razorpay-order:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
