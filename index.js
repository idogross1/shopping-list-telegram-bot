const { Telegraf, Scenes, session, Markup } = require('telegraf');
const { addItemsToList,
    getCurrentList,
    deleteItemFromList,
    getItems,
    emptyList,
    printItem
} = require('./models/lists-service')

require('dotenv').config()

const addItemsToListWizard = new Scenes.WizardScene(
    'add-items-to-list-wizard',
    ctx => {
        ctx.reply('Enter items to list:');
        ctx.wizard.state.data = {};
        return ctx.wizard.next();
    },
    ctx => {
        ctx.wizard.state.data.list = ctx.message.text;
        addItemsToList(ctx.message);
        return ctx.scene.leave();
    }
);

const stage = new Scenes.Stage([addItemsToListWizard]);

const bot = new Telegraf(process.env.TOKEN);

bot.use(session());

bot.use(stage.middleware());

bot.command('additemstolist', ctx => {
    ctx.scene.enter('add-items-to-list-wizard');
});

bot.command('getcurrentlist', ctx => {
    ctx.reply(getCurrentList());
});

bot.command('editlist', ctx => {
    const items = getItems();
    // console.log("🚀 ~ items:", items);
    ctx.reply('Items:');
    items.forEach(({ item, quantity, comments }) => {
        ctx.reply(printItem(item, quantity, comments), {
            ...Markup.inlineKeyboard([
                Markup.button.callback('delete item', 'delete-' + item)
            ])
        })
    })
});

bot.action(/delete-(.*)/, ctx => {
    const itemName = ctx.update.callback_query.data.match(/delete-(.*)/)[1];
    // console.log("🚀 ~ bot.action ~ itemName:", itemName);
    deleteItemFromList(itemName);
    ctx.reply(getCurrentList());
})

bot.command("inline1", ctx => {
    return ctx.reply("Coke or Pepsi?", {
        ...Markup.inlineKeyboard([
            Markup.button.callback("Coke", "Coke"),
            Markup.button.callback("Pepsi", "Pepsi"),
        ]),
    });
});

bot.action('Coke', ctx => {
    console.log('jjjjjjj')
})

bot.launch();
