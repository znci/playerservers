
// Request Attributes

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface Endpoints {
  "login": string,
  "dashboard": string,
  "account": string,
  "console": string,
}

// User Attributes

interface User {
  username: string,
  uuid: string,
  servers: Server[],
  online: boolean,
  activity: {
    first_login: number,
    last_login: number,
  },
  points: number,
  level: {
    exp: number,
    level: number,
  },
  version: {
    protocol: number,
    display: string,
  },
  current_server: string,
  guild: string,
  groups: string[],
  selected_server: Server,
  minigames: {
    warzone: {
      kills: number,
      deaths: number,
      wins: number,
      score: number,
      coins: number,
      wool_destroyed: number,
      activity: {
        first_login: number,
        last_login: number,
        playtime: number,
      },
    },
    tntwars: {
      coins: number,
      kills: number,
      deaths: number,
      wins: number,
      score: number,
      activity: {
        first_login: number,
        last_login: number,
        playtime: number,
      },
    },
    xrun: {
      wins: number,
      plays: number,
      score: number,
      activity: {
        first_login: number,
        last_login: number,
        // there is no playtime.
        // this is completely stupid
        // and inconsistent with the other minigames
      },
      maps: xrunMap[],
    },
    bedwars: {
      coins: number,
      kills: number,
      deaths: number,
      wins: number,
      score: number,
      beds: number,
      activity: {
        first_login: number,
        last_login: number,
        playtime: number,
      },
    },
    arcade: {
      activity: {
        first_login: number,
        last_login: number,
        playtime: number,
      },
      maps: arcadeMap[],
    },
    kitpvp: {
      coins: number,
      kills: number,
      deaths: number,
      score: number,
      activity: {
        first_login: number,
        last_login: number,
        playtime: number,
      },
    },

  }
}

// Server Attributes

// TODO: add more plans
type Plan = {
  "God": 12,
  "Royal": 11,
  "Noble": 10,
  "Level-6": 6,
  "Level-5": 5,
  "Level-4": 4,
  "Level-3": 3,
  "Level-2": 2,
  "Level-1": 1,
  "Free": 0,
}

type ServerIcon = "DIAMOND" | "DIAMOND_SWORD" | "DIAMOND_CHESTPLATE" | "DIAMOND_PICKAXE" | "BOW" | "BED" |
                  "CHEST" | "TNT" | "BEDROCK" | "MOB_SPAWNER" | "SLIME_BLOCK" | "ELYTRA" | "LADDER" | "APPLE" |
                  "REDSTONE" | "WHEAT" | "HAY_BLOCK" | "NONE"

interface Server {
  name: string,
  id: number,
  port: 25565,
  plan?: Plan,
  motd?: string,
  version?: string,
  icon?: ServerIcon,
  visible?: boolean,
}

// Minigame Attributes

interface xrunMap {
  map: string,
  wins: number,
  plays: number,
  best_time: number,
}

interface arcadeMap {
  game: string,
  kills: number,
  deaths: number,
  wins: number,
  plays: number,
  score: number,
  last_played: number,
}

// Server Attributes

type ServerAttribute = "motd" | "version" | "icon" | "visibility" | "stop";

type ServerVersion =  "spigot-1.8" | "paper-1.8" |
                      "spigot-1.12" | "paper-1.12" |
                      "spigot-1.16" | "paper-1.16" |
                      "spigot-1.17" | "paper-1.17" |
                      "spigot-1.18" | "paper-1.18" |
                      "spigot-1.19" | "paper-1.19" |
                      "spigot-1.20" | "paper-1.20";
                    
