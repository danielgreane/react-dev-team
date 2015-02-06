var flux = require('flux-react');
var actions = require('./actions.js');
var _ = require('underscore');
var $ = require('zepto-browserify').$;

var REPOS_ENDPOINT = 'https://api.github.com/repos/';

module.exports = flux.createStore({

  /* Sample data structure to build */
  repos: {
    {
      full_name: "facebook/flux",
      owner: {},
      commits: [] 
    },
    {
      full_name: "zhouzi/theaterJS",
      owner: {},
      commits: [] 
    }
  },

  // top 10 comitters
  committers: [
    {},
    {},
    {}
  ],

  /* Possible actions that can be triggered */
  actions: [
    actions.fetchRepos,
    actions.refreshCommits
  ],

  /* Fetch through intiial list of repos */
  fetchRepos: function() {
    console.log('Fetching repos...');
    _.each(this.repos, function(repo, full_name) {
      $.get(REPOS_ENDPOINT + full_name, function(payload) {
        console.log()
        this.repos[ full_name ] = payload;
        this.emit('repos.fetched');
      }.bind(this));
    }.bind(this));
    // TODO: 
    // 1. Iterate over repos,
    // 2. Ajax request to each endpoint, 
    // 3. save results to repos with corresponding keys 
     // <-- 4. Indicate fetch
  },

  /* Refreshes list of all repos */
  refreshCommits: function() {
    // TODO: 
    // 1. Iterate over repos,
    // 2. Ajax request to commits_endpoint, 
    // 3. save results to repos
    this.emit('commits.refreshed'); // <-- 4. emit indication of finish
  },

  /*Helper methods*/
  _findRepoByKey: function(key) {

  },

  /* Public methods available for retrieving information about the state */
  exports: {

    getRepos: function() {
      return this.repos;
    },

    getRepoById: function(id) {
      return this._getRepoByKey('id', id);
    },

    getTopComitters: function() {
      return this.comitters;
    }
  }
});