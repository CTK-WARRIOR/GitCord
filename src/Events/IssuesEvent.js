const colorObject = { closed: "RED", opened: "GREEN", reopened: "#161b22" }

module.exports = (json, { color } = {}) => {
  return {
    color: color ? color : (colorObject[json.payload.action] ? colorObject[json.payload.action] : "GREEN"),
    author: { name: json.actor.login, icon_url: json.actor.avatar_url },
    title: `[${json.repo.name}] Issue ${json.payload.action}: #${json.payload.issue.number} ${json.payload.issue.title}`,
    url: json.payload.issue.html_url,
    description: json.payload.action === "opened" ? json.payload.issue.body : null
  }
}