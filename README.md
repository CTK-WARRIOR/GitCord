# GitCord
<p align="center"><img align="center" style="width:1px" src="https://cdn.discordapp.com/attachments/675669552796925987/836722446693826610/logo.png"/></p><br/>
<p align="center">
  <a href="https://withwin.in/dbd"><img src="https://badgen.net/discord/online-members/7SFVH6yUuE" alt="Discord"></a>
 </p>

> GitCord allows you to send the github feeds to your discord server without having any issue.

## LINKS

- 📃 Guide/Docs: `Soon`
- 💬 Discord: https://withwin.in/dbd
- 🎥 Youtube: https://www.youtube.com/channel/UClAFgotVhZ1DGvN57EMY7fA
- 🙌 Video Tutorial: `Not Out`
- 💪 Special Contributor: [Legendary Emoji#1742](https://github.com/LegendaryEmoji)
- 🛠 Tools Used: [Axios](https://www.npmjs.com/package/axios)

## Features

- Allows you to easily get the event details
- Fast and Highly Configurable
- Easy to Implement

## Example

```js
const Github = require("gitcord")
const github = new Github("CTK-WARRIOR", {
repositories: ["Discord-Bot-For-Starters", "canvas-senpai"]
})
github.setup()

github.on('newEvent', (json) => {
//do something
})
```
## Without Manual Repositories Addition
Basically you have to add the array of repositories name in options or subscribe repository in order to get feeds related to that repository but we have implemented very usefull feauture for you to get rid of these long chain process.

```js
const Github = require("gitcord")
const github = new Github("CTK-WARRIOR", { token: "Your Super Cool Github Token", gitall: true }) //will throw error if user have more than 50 repo
github.setup()

github.on('newEvent', (json) => {
//do something
})
```

## 🐱‍🏍 How to use on Discord ?
```js
const Github = require("gitcord")
const Discord = require("discord.js")
const client = new Discord.Client();
const github = new Github("CTK-WARRIOR", { token: "Your Super Cool Github Token", gitall: true })
github.setup()

client.on("ready", () => {
  console.log("Connected to the discord, now ready for fight :D")
})

github.on("newEvent", (embed) => {
  client.channels.cache.get("CHANNEL ID").send({embed})
})

client.login("YOUR DISCORD TOKEN")

```
