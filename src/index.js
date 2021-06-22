import dotenv from 'dotenv';
import Discord from 'discord.js';
import router from './router.js';
import memory from './memory.js';

dotenv.config();
memory.boot();

const prefix = '!';

const client = new Discord.Client();

client.on('message', (message) => {
  // Discard if not a command
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  // Lexical analysis
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(/\s+/);
  const command = args.shift().toLowerCase();
  router(client, message, command, args);
});

client.login(process.env.BOT_TOKEN);
