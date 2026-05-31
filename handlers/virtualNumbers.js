module.exports = (bot) => {

 bot.hears('📱 Buy Virtual Number', async (ctx) => {
    await ctx.reply(
      'Choose a country for your virtual number:',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Nigeria', callback_data: 'number_nigeria' }],
            [{ text: 'USA', callback_data: 'number_usa' }],
            [{ text: 'UK', callback_data: 'number_uk' }],
            [{ text: 'Ghana', callback_data: 'number_ghana' }],
            [{ text: 'Kenya', callback_data: 'number_kenya' }],
          ]
        }
      }
    );
  });

  bot.action(/number_(.+)/, async (ctx) => {
    const country = ctx.match[1];
    await ctx.answerCbQuery();
    await ctx.reply(
      'You selected ' + country + '. Choose a service:',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Facebook', callback_data: 'otp_' + country + '_facebook' }],
            [{ text: 'Instagram', callback_data: 'otp_' + country + '_instagram' }],
            [{ text: 'WhatsApp', callback_data: 'otp_' + country + '_whatsapp' }],
            [{ text: 'Twitter', callback_data: 'otp_' + country + '_twitter' }],
            [{ text: 'Gmail', callback_data: 'otp_' + country + '_gmail' }],
          ]
        }
      }
    );
  });

  bot.action(/otp_(.+)_(.+)/, async (ctx) => {
    const country = ctx.match[1];
    const service = ctx.match[2];
    await ctx.answerCbQuery();
    await ctx.reply(
      service + ' OTP number for ' + country + '\n\n' +
      'Price: N150\n\n' +
      'Click below to confirm:',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Confirm Purchase', callback_data: 'confirm_' + country + '_' + service }],
            [{ text: 'Cancel', callback_data: 'cancel_number' }],
          ]
        }
      }
    );
  });

  bot.action(/confirm_(.+)_(.+)/, async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('Processing your request...\n\nYour virtual number will appear here shortly.');
  });

  bot.action('cancel_number', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('Purchase cancelled.');
  });

};
