require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('./models/User');
const bot = require('./index');

const app = express();

// Paystack webhook needs raw body for signature verification
app.post('/webhook/paystack', express.raw({ type: 'application/json' }), async (req, res) => {

  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(req.body)
    .digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    console.log('Invalid Paystack signature');
    return res.sendStatus(401);
  }

  const event = JSON.parse(req.body);

  if (event.event === 'charge.success') {
    const telegramId = event.data.metadata.telegramId;
    const amount = event.data.amount / 100;

    try {
      await User.findOneAndUpdate(
        { telegramId: String(telegramId) },
        { $inc: { walletBalance: amount } }
      );

      console.log(Wallet credited: ₦${amount} for user ${telegramId});

      await bot.telegram.sendMessage(
        telegramId,
        ✅ Payment Successful!\n\nYour wallet has been credited with ₦${amount}.\n\nEnjoy our services! 🎉
      );

    } catch (err) {
      console.log('Webhook error:', err);
    }
  }

  res.sendStatus(200);
});

// All other routes use JSON
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Social Pool Bot Server is running!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('DB Error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
