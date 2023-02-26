// THE API WRAPPER
// I'm not gonna explain this, it's just a bunch of fetch requests. See the README.

const cheerio = require('cheerio');

function login(username, password) {
  return new Promise(async (resolve) => {
    const url = 'https://playerservers.com/login';
    await fetch(url, {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
      }
    })
      .then(async (res) => {
        var cookie;
        const cookies = res.headers.get("set-cookie");
        let cookieValue;
        if (cookies) {
          const cookie = cookies.split(", ").find((s) => s.startsWith("PHPSESSID"));
          if (cookie) {
            cookieValue = cookie.split(";")[0].split("=")[1];
          }
        }
        if (cookieValue) {
          cookie = cookieValue;

        } else {
          console.error("PHPSESSID cookie not found in Set-Cookie header");
        }
        const html = await res.text();
        const $ = cheerio.load(html);
        const requestToken = $("input[name=token]").val();
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('token', requestToken);
        await fetch(url, {
          method: 'POST',
          body: params,
          headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
            'cookie': `PHPSESSID=${cookie}`
          },
          redirect: 'manual'
        }).then(async (res) => {
          if (res.status === 302) {
            console.log('logged in!')
            resolve(cookie);
          } else {
            console.log('failed to login')
            resolve(null);
          }
        }).catch(e => console.error(e));
      })
      .catch(e => console.error(e));
  });
}

function getUsername(cookie) {
  return new Promise(async (resolve) => {
    const url = `https://playerservers.com/account`;
    const res = await fetch(url, {
      headers: {
        'cookie': `PHPSESSID=${cookie}`,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'

      }
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    const element = $(`#content > nav > ul > li > a`);
    resolve(element.text().trim());
  })
}

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

function selectServer(id, cookie) {
  return new Promise(async (resolve) => {
    const url = `https://playerservers.com/dashboard/?s=${id}`;
    await fetch(url, {
      headers: {
        'cookie': `PHPSESSID=${cookie}`,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'

      }
    })
    resolve();
  })
}

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
