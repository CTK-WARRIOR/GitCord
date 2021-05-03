module.exports = (json, { color = "BLUE" } = {}) => {
  return {
    color,
    author: { name: json.actor.login, icon_url: json.actor.avatar_url },
    title: `[${json.repo.name}] Fork Created : ${json.payload.forkee.full_name}`,
    url: json.payload.forkee.html_url,
    footer: { text: "Github" },
    timestamp: new Date()
  }
}