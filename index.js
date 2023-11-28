const { addItemsToList, getCurrentList } = require('./models/lists-service.js');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with the token you obtained from BotFather.
const token = process.env.TOKEN;
// Create a new Telegram bot instance
const bot = new TelegramBot(token, { polling: true });

// // Listen for incoming messages
bot.on('message', addItemsToList);

bot.onText(/\/additemstolist/, (msg) => {
    //   console.log("🚀 ~ bot.onText ~ msg:", msg);
    console.log('1')
    const chatId = msg.chat.id;
    const message = msg.text;
    console.log("🚀 ~ bot.onText ~ message:", message);
    // Handle incoming messages here
    // You can add your custom logic and reply to users.
});

bot.onText(/\/getCurrentList/, msg => {
    console.log('2')
    const currentList = getCurrentList();
    bot.sendMessage(msg.chat.id, "Hello dear user");
})

bot.on('polling_error', err => {
    console.log(err)
})
