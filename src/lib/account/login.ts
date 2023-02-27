import * as cheerio from "cheerio";
import { PSLoginError } from "../misc/errors";

/**
 * Fetches the PHPSESSID cookie from playerservers.com using the provided username and password
 * @param {string} username
 * @param {string} password
 * @returns {Promise<string>}
 * @example
 * const cookie = await login('username', 'password');
 * console.log(cookie);
 * // PHPSESSID=1234567890
 */

export function login(username: string, password: string): Promise<string> {
  return new Promise(async (resolve) => {
    const url = "https://playerservers.com/login";
    await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
      },
    })
      .then(async (res) => {
        var cookie;
        const cookies = res.headers.get("set-cookie");
        let cookieValue;
        if (cookies) {
          const cookie = cookies
            .split(", ")
            .find((s) => s.startsWith("PHPSESSID"));
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
        const requestToken: string = $("input[name=token]").val() as string;
        const params = new URLSearchParams();
        params.append("username", username);
        params.append("password", password);
        params.append("token", requestToken);
        await fetch(url, {
          method: "POST",
          body: params,
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
            cookie: `PHPSESSID=${cookie}`,
          },
          redirect: "manual",
        })
          .then(async (res) => {
            var html = await res.text();
            var $ = cheerio.load(html);

            if (res.status === 302) {
              resolve(cookie);
            } else {
              if (
                $("div.ui.negative.message")
                  .text()
                  .includes("You have entered incorrect details")
              )
                throw new PSLoginError("Invalid username or password");
              else {
                throw new PSLoginError("Unknown error");
              }
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  });
}
