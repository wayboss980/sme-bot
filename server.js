require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('DB Error:', err));

// Paystack webhook - auto credit wallet after payment
app.post('/webhook/paystack', async (req, res) => {
  const event = req.body;

  if (event.event === 'charge.success') {
    const telegramId = event.data.metadata.telegramId;
    const amount = event.data.amount / 100;

    try {
      await User.findOneAndUpdate(
        { telegramId },
        { $inc: { walletBalance: amount } }
      );
      console.log(✅ Wallet credited: ₦${amount} for user ${telegramId});
    } catch (err) {
      console.log('Webhook error:', err);
    }
  }

  res.sendStatus(200);
});

// Health check
app.get('/', (req, res) => {
  res.send('SME Bot Server is running! 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});