/**
 * playerservers 0.0.1 - A Node.js module for interacting with the PlayerServers API
 * (c) 2023 znci - Licensed under the Apache-2.0 License
 */

const cheerio = require('cheerio');
const login = require('./lib/account/login');
const getUsername = require('./lib/account/getUsername');
const getServersInDashboard = require('./lib/playerserver/getServers');
const selectServer = require('./lib/playerserver/selectServer');
const sendCommand = require('./lib/playerserver/console/sendCommand');

/**
 * The PlayerServers class.
 * @class PlayerServers
 */
class PlayerServers {
  constructor(cookie) {
    this.cookie = cookie;
    this.headers = {
      'cookie': `PHPSESSID=${cookie}`,
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
    };
  }
  // methods
  async login(username, password) {
    const cookie = await login(username, password);
    this.cookie = cookie;
    this.headers = {
      'cookie': `PHPSESSID=${cookie}`,
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
    };
  }
  async getUsername() {
    return await getUsername(this.cookie);
  }
  async getServersInDashboard() {
    return await getServersInDashboard(this.cookie);
  }
  async selectServer(id) {
    return await selectServer(id, this.cookie);
  }
  async sendCommand(cmd) {
    return await sendCommand(cmd, this.cookie);
  }
}

module.exports = PlayerServers;
