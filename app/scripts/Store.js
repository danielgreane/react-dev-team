var flux = require('flux-react');
var _ = require('underscore');
var $ = require('zepto-browserify').$;
var actions = require('./actions');
var events = require('./events');
var config = require('./config');
var GitHubTransformer = require('./GitHubTransformer');

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
      visible: true
    },
    {
      id: 'topRepos',
      label: 'Top Repositories',
      visible: true
    },
    {
      id: 'liveCommitStream',
      label: 'Live Commit Stream',
      visible: false
    }
  ],

  _gitHubService: null,

  /* Action: Start the store */
  init: function(gitHubService) {
    _gitHubService = gitHubService;
    this.fetchRepos();
    this.interval = setInterval(this.refreshCommits.bind(this), config.poll_interval);
  },

  /* Action: Fetch through intiial list of repos  */
  fetchRepos: function() {
    // TODO: fetch repos from Github service and fill with commits
    this.repos = [];
    _.each(config.repos, fullName => {
      _gitHubService.getRepo(fullName).then(repo => {
        _gitHubService.getCommits(fullName).then(commits => {
          repo.commits = commits;
          
          //repo.top_committer = { data: {}, count: 815 }; // todo: add data and count

          this.repos.push(repo);

          // todo: delegate this design to another party
          this._transformData();
          this.emit(events.REPOS_REFRESHED);
        })
      });
    });
  },

  /* Action: Refreshes list of all repos */
  refreshCommits: function() {
    _.each(this.repos, repo => {
      _gitHubService.getCommits(repo.full_name).then(commits => {
        repo.commits = commits;
        this._transformData();
        this.emit(events.REPOS_REFRESHED); 
      });
    });
  },

  toggleWidget: function(id, checked) {
    var i = -1;
    var widget = _.find(this.widgets, (w, _i) => (w.id === id ? i=_i : null) );
    if (i > -1) {
      this.widgets[ i ].visible = checked;
      this.emit(events.WIDGETS_TOGGLED);
    }
  },

  _transformData: function() {
    this.modifyCommitDateRange(2);

    this.calculateTopCommitters();
    this.calculateTopRepoCommitters();
    this.calculateRepoVelocities();
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

  // todo: move into a fake service
  _addTestRepo: function() {
    this.repos.push( require('../data/repos/zhouzi/theaterjs') )
    this.repos[2].commits = require( '../data/repos/zhouzi/theaterjs/commits' );
    this.emit(events.REPOS_REFRESHED);
  },

  // todo: move into a fake service
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