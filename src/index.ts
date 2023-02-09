import { Client, Events, GatewayIntentBits } from 'discord.js';
import { exit } from 'process';
import { emit, EventType } from './emitter';
import logger from './logger';

const token = process.env.DISCORD_TOKEN;
if (!token) {
  logger.error('DISCORD_TOKEN is not defined.');
  exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, () => {
  logger.info('ready');
});

client.on(Events.MessageCreate, async (message) => {
  logger.debug('Message received');
  if (!message.content) {
    return;
  }

  const isMessageFromThread = message.channel.isThread();
  if (!isMessageFromThread) {
    return;
  }

  const op = await message.channel.fetchStarterMessage({});
  if (!op) {
    return;
  }

  const opMessageId = op.id;
  const incomingMessageId = message.id;
  const isThreadCreationMessage = incomingMessageId === opMessageId;
  const event: EventType = isThreadCreationMessage
    ? {
        type: 'thread_create',
        payload: {
          forumCategory: '',
          title: message.thread?.name || '',
          timestamp: op.createdAt,
          threadId: op.id,
          messageId: op.id,
          messageContent: op.content,
          authorId: op.author.id,
        },
      }
    : {
        type: 'thread_reply',
        payload: {
          threadId: message.channel.id,
          timestamp: message.createdAt,
          authorId: message.author.id,
          messageId: message.id,
          messageContent: message.content,
        },
      };

  emit(event);
});

client.login(token).catch(logger.error);
