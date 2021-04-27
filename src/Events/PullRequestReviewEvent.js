module.exports = (json, {color="#161b22"}={}) => {
  return {
    color,
		author: {
			name: json.actor.login,
			icon_url: json.actor.avatar_url
		},
    title: `[${json.repo.name}] Pull request review submitted: #${json.payload.pull_request.number} ${json.payload.pull_request.title}`,
    url: json.payload.review.html_url,
    description: json.payload.review.body
  }
}