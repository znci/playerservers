/**
 * Select a server to use.
 * @param {*} id Server ID
 * @param {*} cookie Valid PHPSESSID cookie
 * @returns Promise<void>
 * @example
 * selectServer(1234567890, 'PHPSESSID=1234567890').then(() => {
 *  console.log('Selected server!');
 * });
 */
export async function selectServer(id: string, cookie: string): Promise<null> {
  return new Promise(async (resolve: Function) => {
    const url = `https://playerservers.com/dashboard/?s=${id}`;
    await fetch(url, {
      headers: {
        cookie: `PHPSESSID=${cookie}`,
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
      },
    });
    resolve(null);
  });
}
