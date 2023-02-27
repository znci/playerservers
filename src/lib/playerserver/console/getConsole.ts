/**
 * Get console output.
 * @param {*} cookie Valid PHPSESSID cookie
 * @returns Promise<string>
 */
export function getConsole(cookie: string): Promise<string> {
  return new Promise(async (resolve) => {
    const url = `https://playerservers.com/queries/console_backend/`;
    await fetch(url, {
      method: "GET",
      headers: {
        cookie: `PHPSESSID=${cookie}`,
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
      },
    })
      .then((res) => res.text())
      .then((html) => {
        resolve(html);
      });
  });
}
