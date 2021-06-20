export default (client, message) => {
  const timeTaken = Date.now();
  message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
};
