import ping from '../ping/ping.js';

export default (client, message, command, args) => {
  switch (command) {
    case 'ping':
      ping(client, message);
      break;

  }
};
