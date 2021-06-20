export default (client, message, args) => {
  const numArgs = args.map((x) => parseFloat(x));
  const sum = numArgs.reduce((a, c) => a + c);
  message.reply(`The sum of all the arguments you provided is ${sum}!`);
};
