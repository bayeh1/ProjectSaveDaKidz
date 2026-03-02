// Serverless function for Stripe Checkout
// Deploy this to Vercel, Netlify, or your serverless platform
// 
// For Vercel: TypeScript files in api/ are automatically compiled
// For Netlify: Use netlify/functions/ or configure build settings

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-02-24.acacia',
});

interface Event {
    httpMethod: string;
    body: string;
    headers: {
        origin?: string;
        referer?: string;
    };
}

interface Context {
    // Netlify/Vercel context properties
}

interface Response {
    statusCode: number;
    headers?: Record<string, string>;
    body: string;
}

interface RequestBody {
    amount: number;
}

// For Netlify Functions (AWS Lambda format)
export const handler = async (event: Event, context: Context): Promise<Response> => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { amount } = JSON.parse(event.body) as RequestBody;

        // Validate amount
        if (!amount || amount < 100) { // Minimum $1.00 in cents
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Invalid amount' })
            };
        }

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Donation to Save Da Kidz',
                            description: 'Thank you for your generous donation to help feed children in need',
                        },
                        unit_amount: amount, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${event.headers.origin || event.headers.referer}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${event.headers.origin || event.headers.referer}/`,
            metadata: {
                donation_type: 'general',
            },
        });

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId: session.id }),
        };
    } catch (error) {
        console.error('Error creating checkout session:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: errorMessage }),
        };
    }
};

// For Vercel (alternative export format - uncomment if needed)
// export default async function handler(req: any, res: any) {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ error: 'Method not allowed' });
//     }
//
//     try {
//         const { amount } = req.body;
//
//         if (!amount || amount < 100) {
//             return res.status(400).json({ error: 'Invalid amount' });
//         }
//
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: [
//                 {
//                     price_data: {
//                         currency: 'usd',
//                         product_data: {
//                             name: 'Donation to Save Da Kidz',
//                             description: 'Thank you for your generous donation to help feed children in need',
//                         },
//                         unit_amount: amount,
//                     },
//                     quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//             success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
//             cancel_url: `${req.headers.origin}/`,
//             metadata: {
//                 donation_type: 'general',
//             },
//         });
//
//         res.json({ sessionId: session.id });
//     } catch (error) {
//         console.error('Error creating checkout session:', error);
//         const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//         res.status(500).json({ error: errorMessage });
//     }
// }
