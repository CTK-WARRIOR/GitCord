module.exports = (json, { color="blue" } = {}) => {
	return {
		color,
		author: {
			name: json.actor.login,
			icon_url: json.actor.avatar_url
		},
		title: `[${json.repo.name}] ${json.payload.commits.length} New commit`,
		url: `https://github.com/${json.repo.name}/commit/${json.payload.head}`,
		description: json.payload.commits.map(x => `[\`${x.sha.substring(0, 7)}\`](https://github.com/${json.repo.name}/commit/${x.sha}) ${x.message} - ${x.author.name}`).join("\n"),
		footer: { text: "Github" },
    timestamp: new Date()
	};
};