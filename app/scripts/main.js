/** @jsx React.DOM */
var React = require('react');
var App = require('./components/App.js');
var actions = require('./actions.js');
var flux = require('flux-react');
var Store = require('./Store');
var GitHubService = require('./GitHubService');
var FakeGitHubService = require('./FakeGitHubService');

flux.debug();

var useFakeData = false;
var service = null;

if(useFakeData){
	FakeGitHubService.init({BASE_GITHUB_URL:'https://api.github.com/repos/'});
	service = FakeGitHubService;
} else {
	GitHubService.init({BASE_GITHUB_URL:'https://api.github.com/repos/'});
	service = GitHubService;
}

actions.init(service);

React.render(<App/>, document.body);
