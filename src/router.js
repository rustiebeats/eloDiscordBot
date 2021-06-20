import ping from './commands/ping.js';
import sum from './commands/sum.js';
import server from './commands/server.js';
import userInfo from './commands/user_info.js';

export default (client, message, command, args) => {
  switch (command) {
    case 'ping':
      ping(client, message);
      break;
    case 'sum':
      sum(client, message, args);
      break;
    case 'server':
      server(client, message);
      break;
    case 'user-info':
      userInfo(client, message);
      break;
  }
};
