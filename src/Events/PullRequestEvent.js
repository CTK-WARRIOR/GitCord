const colorObject = { closed: "RED", opened: "GREEN", reopened: "#161b22" }

module.exports = (json, { color } = {}) => {
  return {
    color: color ? color : (colorObject[json.payload.action] ? colorObject[json.payload.action] : "GREEN"),
    author: { name: json.actor.login, icon_url: json.actor.avatar_url },
    title: `[${json.repo.name}] Pull request ${json.payload.action} #${json.payload.pull_request.number}: ${json.payload.pull_request.title}`,
    url: json.payload.pull_request.html_url,
    description: json.payload.action.includes("opened") ? json.payload.pull_request.body : null
  }
}