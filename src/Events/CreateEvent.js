module.exports = (json, { color="GREEN" } = {}) => {
  const obj = {
    color,
    author: { name: json.actor.login, icon_url: json.actor.avatar_url },
    title: ["branch", "tag"].includes(json.payload.ref_type) ? `[${json.repo.name}] new ${json.payload.ref_type} created: ${json.payload.ref}` : json.payload.ref_type === "repository" ? `[${json.repo.name}] new repository created` : `[${json.repo.name}] something created`,
    url: `https://github.com/${json.repo.name}`,
    description: json.payload.description,
    footer: { text: "Github" },
    timestamp: new Date()
  };

  return obj;
};