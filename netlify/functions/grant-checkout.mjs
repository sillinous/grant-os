// Grant OS - Premium Tier Checkout
// Netlify Function: /api/grant-checkout
// 
// Tiers:
//   - Free: 3 searches/day
//   - Pro ($29/mo): Unlimited searches, saved results
//   - Enterprise ($99/mo): API access, bulk export, priority matching

import Stripe from 'stripe';

export default async function handler(req, context) {
  if (req.method === 'OPTIONS') {
    return new Response('OK', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const stripe = new Stripe(Netlify.env.get('STRIPE_SECRET_KEY'));
    const { tier, email } = await req.json();

    const prices = {
      pro: {
        name: 'Grant OS Pro',
        price: 2900, // $29/mo
        description: 'Unlimited AI grant searches, saved results, email alerts',
        mode: 'subscription',
        interval: 'month',
      },
      enterprise: {
        name: 'Grant OS Enterprise',
        price: 9900, // $99/mo
        description: 'API access, bulk export, priority matching, dedicated support',
        mode: 'subscription',
        interval: 'month',
      },
      single: {
        name: 'Grant OS - Deep Search',
        price: 1900, // $19 one-time
        description: 'One comprehensive AI-powered grant search with full report',
        mode: 'payment',
      },
    };

    const selectedTier = prices[tier];
    if (!selectedTier) {
      return new Response(JSON.stringify({ error: 'Invalid tier' }), { status: 400 });
    }

    const sessionParams = {
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: selectedTier.name,
            description: selectedTier.description,
          },
          unit_amount: selectedTier.price,
          ...(selectedTier.mode === 'subscription' ? {
            recurring: { interval: selectedTier.interval },
          } : {}),
        },
        quantity: 1,
      }],
      mode: selectedTier.mode,
      success_url: `${new URL(req.url).origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${new URL(req.url).origin}/?cancelled=true`,
      ...(email ? { customer_email: email } : {}),
      metadata: {
        platform: 'grant-os',
        tier: tier,
        source: 'unless-ecosystem',
      },
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}

export const config = {
  path: '/api/grant-checkout',
};
