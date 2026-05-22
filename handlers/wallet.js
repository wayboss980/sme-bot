const axios = require('axios');
const User = require('../models/User');

module.exports = (bot) => {

  bot.hears('Fund Wallet', async (ctx) => {
    await ctx.reply('Enter the amount in Naira you want to fund (minimum 500):');
  });

  bot.on('text', async (ctx) => {
    const text = ctx.message.text;

    if (text.startsWith('/')) return;
    if (text === 'Boost Social Media') return;
    if (text === 'Buy Virtual Number') return;
    if (text === 'Fund Wallet') return;
    if (text === 'My Orders') return;
    if (text === 'My Account') return;

    const amount = parseInt(text);
    if (isNaN(amount) || amount < 500) return;

    try {
      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          email: ctx.from.id + '@socialpool.com',
          amount: amount * 100,
          metadata: { telegramId: String(ctx.from.id) }
        },
        {
          headers: {
            Authorization: 'Bearer ' + process.env.PAYSTACK_SECRET
          }
        }
      );

      const paymentUrl = response.data.data.authorization_url;
      await ctx.reply('Click the link below to fund ' + amount + ' Naira:\n\n' + paymentUrl);
    } catch (err) {
      console.log(err);
      await ctx.reply('Error generating payment link. Please try again.');
    }
  });

};