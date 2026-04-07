const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// Health check endpoint for Render spin-down prevention
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});
// Initialize Razorpay
// For mocking, if keys aren't set up, we won't crash immediately, but the API calls will fail.
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder',
});

app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;
    
    // If the user hasn't added their real keys yet, mock a response so testing the UI doesn't crash 
    if (process.env.RAZORPAY_KEY_ID === 'rzp_test_placeholder_key_id') {
      console.log("Using Mock Razorpay Mode. Send real keys to use the real API.");
      return res.json({
        id: "order_mock_" + Math.floor(Math.random() * 100000),
        amount: amount * 100, // paise
        currency: currency,
        isMock: true
      });
    }

    const options = {
      amount: amount * 100, // Razorpay works in paise (multiply by 100)
      currency: currency,
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).send("Error creating order");
    }

    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating Razorpay order: " + error.message);
  }
});

app.post('/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, isMock } = req.body;

    if (isMock) {
        // Bypass verification for mock orders
        return res.json({ msg: "Success (Mocked)" });
    }

    // Verify cryptographic signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.json({ msg: "Success" });
    } else {
      return res.status(400).json({ msg: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ msg: "Internal Server Error during verification" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Razorpay Server listening on port ${PORT}`);
});
