const TelegramBot = require('node-telegram-bot-api');
const nonStopApi = require("./nonstop-api");

// replace the value below with the Telegram token you receive from @BotFather
const token = '';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  // send a message to the chat acknowledging receipt of their message
  (async () => {
    const occupancy = await nonStopApi.getOccucpancy();
    const numPeople = Math.round(occupancy * 80 / 100);
    await bot.sendMessage(chatId, "Current occupancy is " + occupancy + "%  ~" + numPeople + " people");
  })();
}); 