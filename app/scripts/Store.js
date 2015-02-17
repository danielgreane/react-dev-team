var flux = require('flux-react');
var _ = require('underscore');
var $ = require('zepto-browserify').$;
var actions = require('./actions');
var events = require('./events');
var config = require('./config');
var GitHubService = require('./GitHubService');
var GitHubTransformer = require('./GitHubTransformer');


var REPOS_ENDPOINT = 'https://api.github.com/repos/';
var Store = {

  /* Field: Sample data structure to build */
  repos: [],

  /* Field: Committers ordered by number of commits*/
  authors: [],

  /* Actions: Possible actions that can be triggered 
     by a component or service */
  actions: [
    actions.init,
    actions.fetchRepos,
    actions.refreshCommits,
    actions.toggleWidget
  ],

  /* Widget states */
  widgets: [
    {
      id: 'topCommitters',
      label: 'Top Committers',
      visible: false
    },
    {
      id: 'topRepos',
      label: 'Top Repositories',
      visible: false
    },
    {
      id: 'liveCommitStream',
      label: 'Live Commit Stream',
      visible: false
    }
  ],


  /* Action: Start the store */
  init: function() {
    this._buildTestRepos();
    this.calculateTopCommitters();
    this.calculateTopRepoCommitters();
    this.fetchRepos();


    // Tests / Demo to illustrate functionality
    setTimeout(this._addTestRepo.bind(this), 1500);
    setTimeout(this._addTestCommits.bind(this), 3000);
    //setTimeout(this._doTestReverse.bind(this), 4500);
    //setTimeout(this._orderReposByLastCommit.bind(this), 6000);

    //console.log(this._dataAccessComponent.name);
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

  toggleWidget: function(id, checked) {
    var i = -1;
    var widget = _.find(this.widgets, (w, _i) => (w.id === id ? i=_i : null) );
    if (i > -1) {
      this.widgets[ i ].visible = checked;
      this.emit(events.WIDGETS_TOGGLED);
    }
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
    this.calculateTopCommitters();
    this.calculateTopRepoCommitters();
    this.calculateRepoVelocities();
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

    getTopCommitters: function() {
      return this.authors;
    },

    getWidget: function(id) {
      var widgets = _.where(this.widgets, {id: id});
      return (widgets.length ? widgets[0] : null);
    },

    getWidgets: function() {
      return this.widgets;
    }

  }
};

module.exports = flux.createStore(_.extend(Store, GitHubTransformer));