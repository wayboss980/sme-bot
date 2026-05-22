require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('DB Error:', err));

app.post('/webhook/paystack', async (req, res) => {
  const event = req.body;

  if (event.event === 'charge.success') {
    const telegramId = event.data.metadata.telegramId;
    const amount = event.data.amount / 100;

    try {
      await User.findOneAndUpdate(
        { telegramId },
        { $inc: { walletBalance: amount } },
        { upsert: true }
      );
      console.log('Wallet credited: N' + amount + ' for user ' + telegramId);
    } catch (err) {
      console.log('Webhook error:', err);
    }
  }

  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('SME Bot Server is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
