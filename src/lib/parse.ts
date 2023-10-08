
function parseCookie(cookie: string): any {
  const list = {}
  cookie.split(';').forEach(function (cookie) {
    const parts = cookie.split('=') as any
    list[parts.shift().trim()] = decodeURI(parts.join('='))
  })
  return list
}

function stringifyCookie(cookie: object): string {
  let string = ''
  for (const key in cookie) {
    string += `${key}=${cookie[key]}; `
  }
  
  return string
}

function parseUUID(uuid: string): string {
  const split = uuid.split("");

  split.splice(8, 0, "-");
  split.splice(13, 0, "-");
  split.splice(18, 0, "-");
  split.splice(23, 0, "-");

  return split.join("");
}

const minecraftVersions = {
  763: "1.20/1.20.1",
  762: "1.19.4",
  761: "1.19.3",
  760: "1.19.1/1.19.2",
  759: "1.19",
  758: "1.18.2",
  757: "1.18/1.18.1",
  756: "1.17.1",
  755: "1.17",
  754: "1.16.4/1.16.5",
  753: "1.16.3",
  752: "1.16.3",
  751: "1.16.2",
  736: "1.16.1",
  735: "1.16",
  578: "1.15.2",
  575: "1.15.1",
  573: "1.15",
  498: "1.14.4",
  490: "1.14.3",
  485: "1.14.2",
  480: "1.14.1",
  477: "1.14",
  404: "1.13.2",
  401: "1.13.1",
  393: "1.13",
  340: "1.12.2",
  338: "1.12.1",
  335: "1.12",
  316: "1.11.1/1.11.2",
  315: "1.11",
  210: "1.10-1.10.2",
  110: "1.9.3/1.9.4",
  109: "1.9.2",
  107: "1.9",
  47: "1.8-1.8.9",
}

function parseProtocol(protocol) {
  if (minecraftVersions[protocol]) {
    return minecraftVersions[protocol];
  } else {
    return null;
  }
}

function getFileExtension(filename: string) {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

export {
  parseCookie,
  stringifyCookie,
  parseUUID,
  parseProtocol
}