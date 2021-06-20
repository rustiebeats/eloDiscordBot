const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = "!";

client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const commandBody = message.content.slice(prefix.length); // blow prefix away.
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase(); // return first command (ex. ping) lowered.

    if(command === "ping"){
        const timeTaken = Date.now();
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }

    else if(command === "sum"){
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);
        message.reply(`The sum of all the arguments you provided is ${sum}!`);
    }

    else if(command === "server"){
        message.reply(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    }

    else if(command === "user-info"){
        message.reply(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
});

client.login(config.BOT_TOKEN);
