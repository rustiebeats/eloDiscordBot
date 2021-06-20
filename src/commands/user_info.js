export default (client, message) => {
  message.reply(
    `Your username: ${message.author.username}\nYour ID: ${message.author.id}`,
  );
};
