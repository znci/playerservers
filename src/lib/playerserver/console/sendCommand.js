/**
 * Send a command to the selected server. *Requires a server to be selected first.*
 * @param {*} cmd Command to send
 * @param {*} cookie Valid PHPSESSID cookie
 * @returns Promise<void>
 * @example
 * sendCommand('say Hello World!', 'PHPSESSID=1234567890').then(() => {
 *  console.log('Sent command!');
 * });
 */
function sendCommand(cmd, cookie) {
  return new Promise(async (resolve) => {
    const url = `https://playerservers.com/queries/console_backend/`
    const params = new URLSearchParams();
    params.append("sendcmd", cmd);
    await fetch(url, {
      method: "POST",
      headers: {
        'cookie': `PHPSESSID=${cookie}`,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
      },
      body: params
    });
    resolve();
  })
}

module.exports = sendCommand;