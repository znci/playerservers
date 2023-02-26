# CubedCraft Playerservers Unofficial API Documentation and Wrapper

## Acknowledgements

This project was made possible by the following people:

- supercrafter100: They're an administrator on the CubedCraft Network, and they've been super helpful in getting this project off the ground.
- zNotChill: Did most of the route finding and documentation.
- zNotCerq: You know who you are.

## What is this?

This is the unofficial documentation for the CubedCraft API. Nobody else would do it, so here it is!

### But why?

Why not? Many PlayerServers users want to use the CubedCraft API, but cannot because there is no documentation and it's super locked down. This is an attempt to fix that.

### But cubed-api exists!

And it's broken, and doesn't work, and is outdated. Also, there is zero documentation.

## API Usage

> Note: All POST related requests **MUST** use Form Data.

> Note: All POST related requests **MUST** also include a token (cookie).

## How do I use this!?

### Via NPM

> Note: The NPM package is in early beta. If you're not a contributor, we recommend using your own solution (see below)

```
$ npm i playerservers
```

```js
// Example: Get servers and log in.
const PlayerServers = require('PlayerServers');

const playerserver = new PlayerServers('PHPSESSID'); // you can set this to anything, it's going to be rewritten by playerserver.login
playerserver.login('mysupercoolemail@supercoolemailprovider.com', 'mysupersecurepassword1!').then(() => {
  playerserver.getServersInDashboard().then((servers) => {
    console.log(servers);
  });
});
```

### Write my own

You can use any of the methods below to interface with the API. For login, we've found a semi-working way here:

```js
const cheerio = require("cheerio");

function login(username, password) {
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
        const requestToken = $("input[name=token]").val();
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
            if (res.status === 302) {
              console.log("logged in!");
              resolve(cookie);
            } else {
              console.log("failed to login");
              resolve(null);
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  });
}
```

## Routes

| Route                                         | Methods   | Description                                                                                        |
| --------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------- |
| /login                                        | GET, POST | Login server. Takes URL-Encoded username, password and token. Returns a cookie.                    |
| /dashboard                                    | GET, POST | GET: Fetches the dashboard, POST: Changes requested data                                           |
| /queries/list_files                           | GET       | Exactly what you think it does. Returns some stupid JSON list. See extneded docs.                  |
| /queries/console_backend                      | GET       | Returns the console output and gives an interface to interact with the console. See extended docs. |
| /queries/servers                              | GET       | Returns a list of servers.                                                                         |
| /queries/pms                                  | GET       | No idea.                                                                                           |
| /queries/alerts                               | GET       | CubedCraft notification system.                                                                    |
| /queries/user                                 | GET       | Returns the user's hovercard data.                                                                 |
| /dashboard/properties                         | GET, POST | Can edit server properties.                                                                        |
| /dashboard/managers                           | GET, POST | Same as below for managers.                                                                        |
| /dashboard/settings                           | GET, POST | View/Set PlayerServer settings. See extended docs.                                                 |
| /suggestions/view/{suggestion_id}{suggestion} | GET, POST |
| /unban                                        | GET, POST | Gets the unban appeal or submits one.                                                              |
| /applications                                 | GET, POST | Gets the application form or submits.                                                              |

## Implemented Functions

This is TODO.

## Extended Docs

### /queries/list_files

Lists files on the current server in a chosen directory.

If selecting root file, use:
`https://playerservers.com/queries/list_files/`
if not, use:
`https://playerservers.com/queries/list_files/?dir=/{dir}`

### /queries/console_backend

Lists the 50 most recent console backend logs from the current server. Can also be used to send commands to the console using a POST request.

### /queries/servers

We actually have no idea what this does, it's in the source code of each webpage, but does nothing.

### /queries/pms

Lists all of the authenticated user's PM messages on CubedCraft's website

### /queries/alerts

Lists all of the authenticated user's alert notifications on CubedCraft's website

### /dashboard/properties

If using a post request, you can change several server properties such as:

- enabled command blocks
- pvp
- monster spawning
- etc.

A default server's property POST request form data:

```plaintext
command_blocks="1"
pvp="1"
monster_spawning="1"
animal_spawning="1"
allow_nether="1"
allow_flight="1"
difficulty="0"
structures="1"
gamemode="0"
force_gamemode="0"
level_type="default"
resource-pack=""
generator-settings="{}"
spawn-protection="0"
level-seed=""
broadcast-console-to-ops="true"
level-name="world"
```

### /dashboard/managers

Manages a server's managers.

Can add a user with a POST request:

```plaintext
new_player: {username}
action: "user"
```

Can change permissions with a POST request: (?action=edit&pid={playerid})

```plaintext
permissions[administrator]: "1"
permissions[managers.edit]: "1"
permissions[ftp.view]: "1"
```

All other permissions should be self explanitory by piecing together the messages on the managers webpage by using common sense.

### /dashboard/settings

Manages a server's vote and boost commands once a user votes or boosts.

Add a vote command:

```plaintext
POST https://playerservers.com/dashboard/settings

Form data
new_command: {command}
action: "new_vote_command"
```

Add a boost command:

```plaintext
POST https://playerservers.com/dashboard/settings

Form data
new_command: {command}
action: "new_boost_command"
```

### /suggestions/view/{suggestion_id}{suggestion}

Views a suggestion, and can vote on a suggestion with a POST request.

Like a suggestion:

```plaintext
POST https://cubedcraft.com/suggestions/view/{suggestion_id}{suggestion}

Form data
action: "vote"
vote: "1"
```

Dislike a suggestion:

```plaintext
POST https://cubedcraft.com/suggestions/view/{suggestion_id}{suggestion}

Form data
action: "vote"
vote: "2"
```

### /unban

Gets the unban form, and submits a ban request.

Uses a request payload. Makes no sense.
If you want to donate unban request request payloads to decode them, go ahead in an issue.

### /applications

Gets the application form, submits an application.

Uses a request payload. Makes no sense.
If you want to donate application request request payloads to decode them, go ahead in an issue.

## Public API

CC's lame public "API". It's barely an API, just gives server info.

It's docs are here: <https://api.playerservers.com>

## About this project

This project is not affiliated with CubedCraft in any way. This is a community project, and is not endorsed by CubedCraft.
We're a small dev team who like to call ourselves [znci](https://github.com/znci).

The entire goal of this project is to make it easy to interface with cubed's for some reason locked down API. We're not trying to make a new website, we're just trying to make it easier to interface with the API.

## Contributing

If you've found a new endpoint, and want to:

- Add it to these docs
  or..
- Add it to the API handler

Please fork this repo, and make a pull request. We'll review it, and if it's good, we'll merge it.
