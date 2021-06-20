import dotenv from 'dotenv';
import Discord from 'discord.js';
import router from './router.js';

dotenv.config();

const client = new Discord.Client();

const prefix = '!';

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // blow prefix away.
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  // return first command (ex. ping) lowered.
  const command = args.shift().toLowerCase();

  router(client, message, command, args);
});

client.login(process.env.BOT_TOKEN);
