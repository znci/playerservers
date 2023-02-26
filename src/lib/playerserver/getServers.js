const cheerio = require('cheerio');

/**
 * Gets a JSON array of servers in the dashboard (credits: supercrafter100/cubedfilemanager)
 * @param {*} cookie Valid PHPSESSID cookie
 * @returns Promise<{name: string, id: number}[]>
 * @example
 * getServersInDashboard('PHPSESSID=1234567890').then((servers) => {
 * console.log(servers);
 * // [{ name: 'My Server', id: 1234567890 }]
 * });
 */
function getServersInDashboard(cookie) {
  return new Promise(async (resolve) => {
    const url = 'https://playerservers.com/account';
    await fetch(url, {
      headers: {
        'cookie': `PHPSESSID=${cookie}`,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
      }
    })
      .then((res) => res.text())
      .then(async (html) => {
        const links = [];
        const names = [];
        const hrefs = [];
        const $ = cheerio.load(html);
        $('tr > td:nth-child(1)').each((index, element) => {
          const name = $(element).text();
          names.push(name);
        })
        $('tr > td:nth-child(6) > a').each((index, element) => {
          const href = $(element).attr('href');
          if (href) {
            hrefs.push(href);
          }
        })
        for (let i = 0; i < names.length; i++) {
          const name = names[i];
          const id = parseInt(hrefs[i].split('?s=')[1]);
          links.push({ name: name, id: id })
        }
        resolve(links);
      })
  })
}

module.exports = getServersInDashboard;