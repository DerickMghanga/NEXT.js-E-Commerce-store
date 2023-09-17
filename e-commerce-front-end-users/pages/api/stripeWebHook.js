import { mongooseConnect } from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from "micro";   //put stripe request as a buffer

const endpointSecret = "whsec_714c3d2ffb2a4846422427261defc3b4e148c9c6beb1dcfdc00be195164de71a";

export default async function handler(req, res) {
    await mongooseConnect();

    const sig = req.headers['stripe-signature'];

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        console.log(paymentIntentSucceeded);
        
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
}

//Tell Next.js to disable Parser since next.js does it by default
export const config = {
    api: {bodyParser: false}
}