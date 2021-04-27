# GitCord
<p align="center"><img align="center" style="width:1px" src="https://cdn.discordapp.com/attachments/824651779757047808/836387276246089798/20210427_051416.png"/></p><br/>
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

## Example

```js
const Github = require("gitcord")
const github = new Github("CTK-WARRIOR").event()

github.on('newEvent', (json) => {
//do something
})
```
