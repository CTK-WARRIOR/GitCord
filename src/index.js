/**
 * Modules and Variables
 */
const { fetchUserData, checkWhatsNew, gitAll } = require("./util.js");
const EventEmitter = require('events');
const { TimeLimit, Headers } = require("./config.json");

/**
 * Github classs
 * extended with EventEmitter
 */

class Github extends EventEmitter {
  /**
   * @typedef {Object} Options
   * @property {string} [options.color]
   * @property {string} [options.token] github token which is required to increase the rate limit to 5000
   * @property {number} [options.intervalTime] time of the interval of checking the github events 
   */

  /**
   * @constructor
   * @param {string} [username] github username of the user
   * @param {Options} [color, token, intervalTime] options for the github feeds
   */
  constructor(username, { color, token, intervalTime, repositories, gitall } = {}) {
    if (!username) throw new Error('You need to provode your github username.')
    if (token) Headers.Authorization = `token ${token}`
    super()

    /**
     * Github display username of the user.
     * @type {string}
     */
    this.username = username

    /**
     * Hex color for the json embed (optional)
     * @type {string}
     */
    this.color = color

    /**
     * Token of the github user, token will increase the rate limit to 5000/h (using token is highly suggested)
     * @type {string}
     */
    this.token = token

    /**
     * Time for the interval for checking the API
     * @type {number}
     */
    this.intervalTime = intervalTime || TimeLimit

    /**
     * List of repositories that we will watch for events
     * @type {Array}
     */
    this.repositories = repositories || []

    /**
     * List of the all the stored events which are being compare with new one for feeds
     */
    this.events = {}

    /**
     * If this enable then it ignores the [repositories] option and get all repositories of user from its profile but it do have limit of 50 repositories, so the error will be thrown if repositories number reach to 50 or more.
     */
    this.gitall = gitall || false
  }
  
  /**
   * Start to watch all events
   */
  async setup() {
    if(this.gitall) this.repositories = await gitAll(this.username, Headers)

    for (let repo of this.repositories) fetchUserData(this.username, Headers, repo, (eventsObject) => (this.events[repo] = eventsObject.map((e) => e.id)))

    setInterval(() => this.repositories.length ? checkWhatsNew({ username: this.username, events: this.events, headers: Headers, color: this.color, repository: this.repositories, github: this }) : "", this.intervalTime)
  }

  /**
   * subscribe to github repository so that you can receive feeds related to it
   * @param {string|Array} github repository name
   */
  subscribe(repository) {
    const RepoArray = typeof repository === 'string' ? [repository] : repository

    for (let repo of RepoArray) {
      fetchUserData(this.username, Headers, repo, (eventsObject) => (this.events[repo] = eventsObject.map((e) => e.id)))
      !this.repositories.includes(repo) ? this.repositories.push(repo) : ""
    }
  }

  /**
   * unsubsribe to github repository to stop reciving calls from event
   * @param {string|Array} github repository name
   */

  unsubscribe(repository) {
    let repoArray = typeof repository === 'string' ? [repository] : repository
    repoArray = repoArray.filter(x => this.repositories.includes(x))

    for (let repo of repoArray) {
      delete this.events[repo]
      this.repositories.splice(this.repositories.indexOf(repo), 1)
    }
  }

}

module.exports = Github