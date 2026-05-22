const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, unique: true },
  firstName: String,
  username: String,
  walletBalance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);