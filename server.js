import express from "express";
import dotenv from 'dotenv';
import Stripe from "stripe";

// Load variables
dotenv.config();

// Start Server
const app = express ();

app.use (express.static('public'));
app.use(express.json());

// Home Route
app.get("/", (reg, res) => {
    res.sendFile("index.html", { root: "public" });
});

// Stripe
let stripeGateway = stripe(process.env.stripe_api);

    app. listen (3000, () => {
    console. log("listening on port 3000;");
    });