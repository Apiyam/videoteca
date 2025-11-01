import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51QNrE9EN9YreFft0HlxXECxVkvLruW2lVdjoRUP11xROzLjwkhT4VR1GYjPDWIJXd75vF1lvf0nlWJuSgeJwg7SE00pWzcTyyi');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'mxn',
              product_data: {
                name: 'Pago de viaje',
              },
              unit_amount: 2000, // $20.00
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      res.status(200).json({ id: session.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
