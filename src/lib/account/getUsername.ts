const cheerio = require("cheerio");

/**
 * fetches the username from the account page
 * @param {string} cookie A PHPSESSID cookie
 * @returns {Promise<string>}
 * @example
 * getUsername().then((username) => {
 *  console.log(username);
 * // mysupercoolusername1234
 * });
 */
export function getUsername(cookie: string): Promise<string> {
  return new Promise(async (resolve) => {
    const url = `https://playerservers.com/account`;
    const res = await fetch(url, {
      headers: {
        cookie: `PHPSESSID=${cookie}`,
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
      },
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    const element = $(`#content > nav > ul > li > a`);
    resolve(element.text().trim());
  });
}
