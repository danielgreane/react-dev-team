/** @jsx React.DOM */
var React = require('react');
var App = require('./components/App.js');
var actions = require('./actions.js');
var flux = require('flux-react');
var Store = require('./Store');
var GitHubService = require('./GitHubService');
var GithubAuth = require('./GithubAuth');
var config = require('./config');
var FakeGitHubService = require('./FakeGitHubService');
var service = null;


GithubAuth.init(bootstrap);

function bootstrap(token) { // past this point only if auth token present
	config.access_token = token;
	console.log(token, ' is the token!');
	flux.debug();

	if(config.useFakeData){
		FakeGitHubService.init(config);
		service = FakeGitHubService;
	} else {
		GitHubService.init(config);
		service = GitHubService;
	}

	actions.init(service);
	React.render(<App/>, document.body);

}