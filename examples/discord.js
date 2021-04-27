const Github = require("gitcord")
const Discord = require("discord.js")
const client = new Discord.Client();
const github = new Github("CTK-WARRIOR", { repositories: ["GitCord"] })
github.setup()

client.on("ready", () => {
  console.log("Connected to the discord, now ready for fight :D")
})

github.on("newEvent", (embed) => {
  client.channels.cache.get("CHANNEL ID").send({embed})
})

client.login("TOKEN")