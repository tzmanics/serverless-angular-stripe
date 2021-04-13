const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: process.env.URL,
    cancel_url: process.env.URL,
    line_items: [
      {
        name: product.name,
        description: product.description,
        images: [product.image],
        amount: product.price,
        quantity: 1,
      },
    ],
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
};
