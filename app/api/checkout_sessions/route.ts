import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cartItems = body.cartItems;
    console.log([cartItems]);

    // Create line items for each cart item
    const lineItems = cartItems.map((item: any) => ({
      adjustable_quantity: {
        enabled: true,
      },
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description,
          images: [item.imageSrc],
          metadata: {
            color: item.color,
            size: item.size,
            id: item.id,
          },
        },
        unit_amount: parseFloat(item.price.replace('$', '')) * 100,
      },
    }));

    console.log({lineItems});

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: lineItems,
      mode: 'payment',
      return_url:
        `${request.nextUrl.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: {enabled: true},
      shipping_options: {
        display_name: 'Standard Shipping',
        delivery_estimate: {
            minimum: {
                unit: 'business_day',
                value: 5
            },
            maximum: {
                unit: 'business_day',
                value: 7
            }
        }
      }
    });

    console.log({session});

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err: any) {
    console.log({err});
    return NextResponse.json({ error: err.raw ? err.raw.message : err.message }, { status: err.statusCode || 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details?.email
    });
  } catch (err: any) {
    return NextResponse.json({ error:  err.raw ? err.raw.message : err.message }, { status: err.statusCode || 500 });
  }
}