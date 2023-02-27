/**
 * playerservers 0.0.1 - A Node.js module for interacting with the PlayerServers API
 * (c) 2023 znci - Licensed under the Apache-2.0 License
 */

// Methods
import { login } from "./lib/account/login";
import { getUsername } from "./lib/account/getUsername";
import { getServersInDashboard } from "./lib/playerserver/getServers";
import { selectServer } from "./lib/playerserver/selectServer";
import { sendConsoleCommand } from "./lib/playerserver/console/sendCommand";

/**
 * @class PlayerServers
 */
class PlayerServers {
  cookie: any;
  headers: { cookie: string; "user-agent": string };
  constructor(cookie) {
    this.cookie = cookie;
    this.headers = {
      cookie: `PHPSESSID=${cookie}`,
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
    };
  }
  // methods
  /**
   * Login to PlayerServers
   * @param username Username
   * @param password Password
   * @returns Promise<void>
   * @example
   * const playerservers = new PlayerServers();
   * playerservers.login('username', 'password').then(() => {
   *  console.log('Logged in!');
   * });
   */
  async login(username, password) {
    const cookie = await login(username, password);
    this.cookie = cookie;
    this.headers = {
      cookie: `PHPSESSID=${cookie}`,
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
    };
  }
  /**
   * Get logged in user's username
   * @returns Promise<string>
   */
  async getUsername() {
    return await getUsername(this.cookie);
  }
  /**
   * Get servers in dashboard
   * @returns Promise<Array>
   * @example
   * playerservers.getServersInDashboard().then((servers) => {
   * console.log(servers);
   * // [
   * //   {
   * //     id: '1234567890',
   * //     name: 'My Server',
   * //   },
   * // ]
   * });
   */
  async getServersInDashboard() {
    return await getServersInDashboard(this.cookie);
  }
  /**
   * Select a server to work on.
   * @param {*} id Server ID
   * @returns Promise<void>
   * @example
   * playerservers.selectServer(1234567890).then(() => {
   *  console.log('Selected server!');
   * });
   */
  async selectServer(id) {
    return await selectServer(id, this.cookie);
  }
  /**
   * Send a console command to the selected server.
   * @param {*} command Command to send
   * @returns Promise<void>
   * @example
   * playerservers.sendConsoleCommand('say Hello World!').then(() => {
   *  console.log('Sent command!');
   * });
   */
  async sendConsoleCommand(command) {
    return await sendConsoleCommand(command, this.cookie);
  }
}

module.exports = PlayerServers;
