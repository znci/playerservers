const PlayerServers = require('./src/index');

const ps = new PlayerServers('');

ps.login('invalid@example.com', 'invalidpassword12').then(async () => {
  throw new Error('Login should have failed')
});
