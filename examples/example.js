const Github = require("gitcord")
const github = new Github("CTK-WARRIOR", {
repositories: ["Discord-Bot-For-Starters", "canvas-senpai"]
})
github.setup()

github.on('newEvent', (json) => {
console.log(json)
})