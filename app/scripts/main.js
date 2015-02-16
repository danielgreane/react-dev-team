/** @jsx React.DOM */
var React = require('react');
var App = require('./components/App.js');
var actions = require('./actions.js');
var flux = require('flux-react');
var Store = require('./Store');
var GitHubService = require('./GitHubService');

flux.debug();

GitHubService.init({BASE_GITHUB_URL:'https://api.github.com/repos/'});

Store.setDataAccessComponent({ name: 'HELLO!' });

React.render(<App/>, document.body);
