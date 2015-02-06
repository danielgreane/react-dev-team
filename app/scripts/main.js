/** @jsx React.DOM */
var React = require('react');
var App = require('./components/App.js');
var actions = require('./actions.js');
var flux = require('flux-react');

flux.debug();
React.render(<App/>, document.body);