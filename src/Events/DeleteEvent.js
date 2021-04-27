module.exports = (json, { color = "RED" } = {}) => {
  const obj = {
    color,
    author: { name: json.actor.login, icon_url: json.actor.avatar_url },
    title: ["branch", "tag"].includes(json.payload.ref_type) ? `[${json.repo.name}] ${json.payload.ref_type} deleted: ${json.payload.ref}` : json.payload.ref_type === "repository" ? `[${json.repo.name}] repository deleted` : `[${json.repo.name}] something deleted`,
    url: json.repo.url,
    description: json.payload.description,
    footer: { text: "Github" },
    timestamp: new Date()
  };


  return obj;
};