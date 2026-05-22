const Order = require('../models/Order');

module.exports = (bot) => {

  bot.hears('My Orders', async (ctx) => {
    try {
      const orders = await Order.find({
        telegramId: String(ctx.from.id)
      }).sort({ createdAt: -1 }).limit(5);

      if (orders.length === 0) {
        return await ctx.reply('You have no orders yet.');
      }

      let message = 'Your Last 5 Orders:\n\n';

      orders.forEach((order, index) => {
        message += (index + 1) + '. ' + order.platform + ' - ' + order.service + '\n';
        message += '   Quantity: ' + order.quantity + '\n';
        message += '   Amount: N' + order.amount + '\n';
        message += '   Status: ' + order.status + '\n';
        message += '   Date: ' + order.createdAt.toDateString() + '\n\n';
      });

      await ctx.reply(message);

    } catch (err) {
      console.log(err);
      await ctx.reply('Error fetching orders.');
    }
  });

};