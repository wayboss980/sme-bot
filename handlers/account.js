const User = require('../models/User');

module.exports = (bot) => {

  bot.hears('👤 My Account', async (ctx) => {
    try {
      let user = await User.findOne({ telegramId: String(ctx.from.id) });

      if (!user) {
        user = await User.create({
          telegramId: String(ctx.from.id),
          firstName: ctx.from.first_name,
          username: ctx.from.username || 'N/A',
          walletBalance: 0
        });
      }

      await ctx.reply(
        'My Account\n\n' +
        'Name: ' + user.firstName + '\n' +
        'Username: @' + user.username + '\n' +
        'Wallet Balance: N' + user.walletBalance + '\n' +
        'Joined: ' + user.createdAt.toDateString()
      );
    } catch (err) {
      console.log(err);
      await ctx.reply('Error fetching account info.');
    }
  });

};


