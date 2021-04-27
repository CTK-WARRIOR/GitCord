/**
 * I like Axios more than Fetch :D
 */
const Axios = require("axios").default;

/**
 * Function to handle the errors
 * @param {string} [msg]
 */
async function __err(msg) {
  throw new Error(msg);
};

/**
 * Function to get the json data from github API
 * @param {string}  [username]
 * @param {Object} [headers]
 * @param {Array} [repository]
 * @return {Object} JSON data fetched from API
 */
async function fetchUserData(username, headers, repository, func = (response) => { return response }) {
  if (!username) return __err("Missing \"username\" Argument");
  const { data } = await Axios.get(`https://api.github.com/repos/${encodeURI(username)}/${encodeURI(repository)}/events`, { responseType: "json", headers })

  return func(data);
};

/**
 * Function to check if there is any new event
 * @param {Object} [options]
 * @property {string} [options.username]
 * @property {Object} [options.events]
 * @property {Object} [options.headers]
 * @property {string} [options.color]
 * @property {Array} [options.repository]
 * @property {Object} [options.github]
 */
async function checkWhatsNew({ username, events, headers, color, repository, github } = {}) {

  for (let repo of repository) {
    const data = await fetchUserData(username, headers, repo);
    const latestEvents = data.filter((element) => !events[repo].includes(element.id));
    if (!latestEvents.length) continue;

    for (let Element of latestEvents.reverse()) {
      try {
        github.emit("newEvent", require(`./Events/${Element.type}`)(Element, { color }))
      } catch (err) {
        if (err.toString().includes("Cannot find module")) console.log({ event: Element.type, message: "this event is ignored because its not supported for now, let us know if you want this event to be added." })
      }
      events[repo].push(Element.id);
    };
  }
};

/**
 * Function to get all the repository of provided Github user
 * @param {string} [username]
 * @param {Object} [headers]
 * @return {Array} Array of all repositories name
 */
async function gitAll(username, headers) {
   if(!headers.Authorization) __err("Github token is required for this action")
   const { data } = await Axios.get(`https://api.github.com/users/${encodeURI(username)}/repos`, { responseType: "json", headers })
   if(data.size > 50) __err("Your github profile have more than 50 repositories which is why you can not use gitAll Feeds feauture.")

   return data.map(x => x.name)
}

module.exports = { fetchUserData, checkWhatsNew, gitAll };