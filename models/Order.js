const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  telegramId: String,
  type: String,
  platform: String,
  service: String,
  link: String,
  quantity: Number,
  amount: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);