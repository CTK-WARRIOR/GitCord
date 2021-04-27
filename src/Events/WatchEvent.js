module.exports = (json, {color="#161b22"}={}) => {
  return {
    color,
		author: {
			name: json.actor.login,
			icon_url: json.actor.avatar_url
		},
    title: `[${json.repo.name}] New star added`,
    url: json.repo.url,
    footer: { text: "Github"},
    timestamp: new Date()
  }
}