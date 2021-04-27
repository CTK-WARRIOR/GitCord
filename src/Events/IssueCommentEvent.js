module.exports = (json, {color="#e68d60"}={}) => {
  return {
    color: json.payload.issue.pull_request ? "#bfe5bf" : "#e68d60",
    author: { name: json.actor.login, icon_url: json.actor.avatar_url },
    title: `[${json.repo.name}] New comment on ${json.payload.issue.pull_request ? 'pull request' : 'issue'} #${json.payload.issue.number}: ${json.payload.issue.title}`,
    url: json.payload.comment.html_url,
    description: json.payload.comment.body
  }
}


