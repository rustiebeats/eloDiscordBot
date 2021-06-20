export default (client, message) => {
  message.reply(
    `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`,
  );
};
