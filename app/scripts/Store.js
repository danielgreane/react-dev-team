var flux = require('flux-react');
var actions = require('./actions');
var events = require('./events');
var config = require('./config');

var _ = require('underscore');
var $ = require('zepto-browserify').$;

var REPOS_ENDPOINT = 'https://api.github.com/repos/';



module.exports = flux.createStore({

  /* Field: Sample data structure to build */
  repos: [],

  /* Field: Committers ordered by number of commits*/
  authors: [],

  /* Actions: Possible actions that can be triggered 
     by a component or service */
  actions: [
    actions.init,
    actions.fetchRepos,
    actions.refreshCommits
  ],

  /* Action: Start the store */
  init: function() {
    this._buildTestRepos();
    this._calculateTopCommitters();
    this.fetchRepos();

    // Tests / Demo to illustrate functionality
    setTimeout(this._addTestRepo.bind(this), 1500);
    setTimeout(this._addTestCommits.bind(this), 3000);
    setTimeout(this._doTestReverse.bind(this), 4500);
    setTimeout(this._orderReposByLastCommit.bind(this), 6000);
  },

  /* Action: Fetch through intiial list of repos  */
  fetchRepos: function() {
    // TODO: fetch repos from Github service and fill with commits
    this.emit(events.REPOS_REFRESHED);
  },

  /* Action: Refreshes list of all repos */
  refreshCommits: function() {
    // TODO: fetch updated commits from Github service
    this.emit(events.REPOS_REFRESHED); 
  },

  /* Helper: Re-orders commits by most recent and notifies elements  */
  _orderReposByLastCommit: function() {
    this.repos = this.repos.sort(function(a, b) {
      var date1 = a.commits[0].commit.author.date;
      var date2 = a.commits[1].commit.author.date
      if (date1 < date2)
        return -1;
      if (date1 > date2)
        return 1;
      return 0;
    });
    this.emit(events.REPOS_REFRESHED);
  },

  /* Helper: Calculate top-committer list & broadcase */
  _calculateTopCommitters: function() {
    var authors = {};

    // 1. Count all authors
    _.each(this.repos, function(repo) {
      _.each(repo.commits, function(commit) {
        if ('author' in commit && commit.author) {
          if (commit.author.id in authors) {
            authors[ commit.author.id ].count++;
          } else {
            authors[ commit.author.id ] = {
              count: 1,
              data: commit.author
            };
          }
        }
      }.bind(this));
    }.bind(this));

    // 2. Attach totals to the global store variable
    _.each(authors, function(author) {
      this.authors.push(author);
    }.bind(this));

    // 3. Sort authors by the count we just gave it
    this.authors.sort(function(a, b) {
      if (a.count > b.count)
        return -1;
      if (a.count < b.count)
        return 1;
      return 0;
    });

    // 4. Broadcast the update to components
    this.emit(events.TOP_COMMITTERS_REFRESHED);
  },

  /* Demo: Builds the objects from dummy data stored in json */
  _buildTestRepos: function() {
    // repos
    this.repos[0] = require( '../data/repos/facebook/flux' );
    this.repos[1] = require( '../data/repos/facebook/presto' );

    // commits
    this.repos[0].commits = require('../data/repos/facebook/flux/commits' );
    this.repos[1].commits = require( '../data/repos/facebook/presto/commits' );
  },

  _addTestRepo: function() {
    this.repos.push( require('../data/repos/zhouzi/theaterjs') )
    this.repos[2].commits = require( '../data/repos/zhouzi/theaterjs/commits' );
    this.emit(events.REPOS_REFRESHED);
  },

  _addTestCommits: function() {
    this.repos[0].commits.unshift( require( '../data/repos/zhouzi/theaterjs/commits' )[1] );
    this.repos[0].commits[0].commit.author.date = new Date();
    this.emit(events.REPOS_REFRESHED);
  },

  _doTestReverse: function() {
    this.repos = this.repos.reverse();
    this.emit(events.REPOS_REFRESHED);
  },

  /* Public methods available for retrieving information about the state */
  exports: {

    getRepos: function() {
      return this.repos;
    },

    getRepoById: function(id) {
      return _.findWhere(this.repos, {id: id});
    },

    getRepoByName: function(name) {
      return _.findWhere(this.repos, {id: id});
    },

    getCommits: function(id) {
      var repo = this.exports.getRepoById(id);
      return (repo ? repo.commits : undefined);
    },

    getTopComitters: function() {
      return this.comitters;
    }

  }
});