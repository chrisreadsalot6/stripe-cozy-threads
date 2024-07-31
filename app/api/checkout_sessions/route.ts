import {NextRequest, NextResponse} from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// POST: Create a checkout session
export async function POST(request: NextRequest) {
    try {
        // Get cart items
        const {cartItems} = await request.json();

        // Create Stripe-compatible line items from cart items
        const lineItems = cartItems.map((item: any) => {
            // Convert price to cents
            const cents = Math.round(parseFloat(item.price.replace('$', ''))) * 100;
            // Add size and color to item description
            const description = `${item.description} - ${item.size} in ${item.color}`;
            // Convert relative image path to absolute URL
            const imageUrl = new URL(item.imageSrc, `${request.nextUrl.origin}`).toString();

            return {
                adjustable_quantity: {
                    enabled: true,
                },
                quantity: item.quantity,
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        description: description,
                        images: [imageUrl],
                        metadata: {color: item.color, size: item.size, id: item.id},
                    },
                    unit_amount: cents,
                },
            };
        });

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: lineItems,
            mode: 'payment',
            return_url: `${request.nextUrl.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
            automatic_tax: {enabled: true},
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'usd',
                        },
                        display_name: 'Free shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                },
            ],
        });

        // Return the client secret
        return NextResponse.json({clientSecret: session.client_secret});
    } catch (err: any) {
        return NextResponse.json({error: err.raw ? err.raw.message : err.message}, {status: err.statusCode || 500});
    }
}

// GET: Retrieve a checkout session
export async function GET(request: NextRequest) {
    // Get session ID from URL
    const {searchParams} = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
        return NextResponse.json({error: 'Missing session_id'}, {status: 400});
    }

    // Return the session details to client
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items', 'customer', 'shipping_cost.shipping_rate'],
        });

        return NextResponse.json({
            status: session.status,
            customer_email: session.customer_details?.email,
            shipping_rate: (session.shipping_cost?.shipping_rate as Stripe.ShippingRate)?.display_name,
            amount_total: session.amount_total,
            currency: session.currency,
            line_items: session.line_items,
        });
    } catch (err: any) {
        return NextResponse.json({error: err.raw ? err.raw.message : err.message}, {status: err.statusCode || 500});
    }
}
