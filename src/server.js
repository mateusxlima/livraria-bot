const restify = require('restify');
const path = require('path');
const { BotFrameworkAdapter, MemoryStorage, ConversationState, UserState } = require('botbuilder');
const Bot = require('./bot');

const ENV_FILE = path.join(__dirname, '../.env');
require('dotenv').config({ path: ENV_FILE });

const port =  process.env.port || process.env.PORT || 3978;
const server = restify.createServer();

const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
})

const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

adapter.onTurnError = async (context, error) => {
  console.error(`\n [onTurnError] unhandled error: ${error}`);
  await context.sendTraceActivity(
    'OnTurnError Trace',
    error,
    'https://www.botframework.com/schemas/error',
    'TurnError'
  );
  await context.sendActivity('Ops, parece que algo saiu errado 🤦‍♂️');
  await context.sendActivity('Você poderia tentar novamente? 😅');
};

const bot = new Bot(conversationState, userState);

server.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    await bot.run(context);
  });
});

server.listen(port, () => {
  console.log('Server running on port %d', port);
  console.log(process.pid)
});