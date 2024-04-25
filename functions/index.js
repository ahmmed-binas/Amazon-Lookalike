const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OgbKmKYBpYnIFJV0cKDA22Az2IX2hCgjj1IJaQf3NFwCPdTe8mLhuUHkIlubTCU6fmGF5HK7eIWE5evIeV8ke5c003YkrpEw7"
);


const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("Hello, world!"));

app.post("/payments/create", async (request, response) => {
  const { total } = request.query; // Destructure the total from request.query

  console.log("Payment Request Received for this amount:", total);

  try {
   
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(total), 
      currency: "usd",
    });

    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    
    console.error("Error creating payment intent:", error.message);
    response.status(500).send({ error: "Error creating payment intent" });
  }
});

// Listen to the specified HTTP function
exports.api = functions.https.onRequest(app);
