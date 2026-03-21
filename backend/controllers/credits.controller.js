import Stripe from "stripe"
import UserModel from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

// if stripe secret key not present
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key missing in .env");
}

// Initialise stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Credit list for values
const CREDIT_MAP = {
  100: 50,
  200: 120,
  500: 300,
};

// function to create credit order and for payments
export const createCreditsOrder = async (req, res) => {
  try {
    const userId = req.userId; // take request ID
    const { amount } = req.body; // take amount
    // check credit amount
    if (!CREDIT_MAP[amount]) {
      return res.status(400).json({ message: "Invalid credit plan" });
    }

    // session for stripe
     const clientUrl = (process.env.CLIENT_URL || "").replace(/\/+$/, "");
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      // success_url: `${process.env.CLIENT_URL}/payment-success`,
      // cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
      success_url: `${clientUrl}/payment-success`,
      cancel_url: `${clientUrl}/payment-failed`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${CREDIT_MAP[amount]} Credits`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      //   by meta data update credits later
      metadata: {
        userId,
        credits: CREDIT_MAP[amount],
      },
    });

    // send this url to frontend
    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: "Stripe error" });
  }
};

//  function for stripe webhook that used to verify the payment
export const stripeWebhook = async (req, res) => {
  // find stripe signature to check
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // construct event
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.log("❌ Webhook signature error:", error.message);
    return res.status(400).send("Webhook Error");
  }

  //   Check if payment completed then update credits
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // user id from metadata
    const userId = session.metadata.userId;
    // find credita to add
    const creditsToAdd = Number(session.metadata.credits);
    //  if something missing
    if (!userId || !creditsToAdd) {
      return res.status(400).json({ message: "Invalid metadata" });
    }

    //  find user and add credits
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $inc: { credits: creditsToAdd },
        $set: { isCreditAvailable: true },
      },
      { new: true },
    );
  }
  res.json({ received: true });
};
