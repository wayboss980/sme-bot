require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const mongoose = require('mongoose');

const bot = new Telegraf(process.env.BOT_TOKEN);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('DB Error:', err));

bot.start(async (ctx) => {
  const name = ctx.from.first_name;
  await ctx.reply(
    'Welcome ' + name + ' to Social Pool Bot!\n\nWhat would you like to do?',
    Markup.keyboard([
      ['📈 Boost Social Media', '📱 Buy Virtual Number'],
      ['💰 Fund Wallet', '💼 My Orders'],
      ['👤 My Account']
    ]).resize()
  );
});

require('./handlers/boost')(bot);
require('./handlers/wallet')(bot);
require('./handlers/virtualNumbers')(bot);
require('./handlers/orders')(bot);
require('./handlers/account')(bot);

if (require.main === module) {
  bot.launch();
}
console.log('Bot is running...');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
module.exports = bot;
