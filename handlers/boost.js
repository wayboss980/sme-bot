const User = require('../models/User');
const Order = require('../models/Order');
const axios = require('axios');

module.exports = (bot) => {

  bot.hears('📈 Boost Social Media', async (ctx) => {
    await ctx.reply(
      'Choose a platform to boost:',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '📘 Facebook', callback_data: 'boost_facebook' }],
            [{ text: '📸 Instagram', callback_data: 'boost_instagram' }],
            [{ text: '🐦 Twitter/X', callback_data: 'boost_twitter' }],
            [{ text: '▶️ YouTube', callback_data: 'boost_youtube' }],
            [{ text: '🎵 TikTok', callback_data: 'boost_tiktok' }],
          ]
        }
      }
    );
  });

  bot.action(/boost_(.+)/, async (ctx) => {
    const platform = ctx.match[1];
    await ctx.answerCbQuery();
    await ctx.reply(
      'You selected ' + platform + '. What do you want to boost?',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '👥 Followers', callback_data: 'service_' + platform + '_followers' }],
            [{ text: '❤️ Likes', callback_data: 'service_' + platform + '_likes' }],
            [{ text: '👁 Views', callback_data: 'service_' + platform + '_views' }],
            [{ text: '💬 Comments', callback_data: 'service_' + platform + '_comments' }],
          ]
        }
      }
    );
  });

  bot.action(/service_(.+)_(.+)/, async (ctx) => {
    const platform = ctx.match[1];
    const service = ctx.match[2];
    await ctx.answerCbQuery();
    await ctx.reply(
      'You selected ' + service + ' for ' + platform + '\n\n' +
      'Send your profile/post link and quantity.\n' +
      'Format: link quantity\n' +
      'Example: https://instagram.com/yourpage 1000'
    );
  });

};