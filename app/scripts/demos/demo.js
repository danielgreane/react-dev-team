/** @jsx React.DOM */
var React = require('react');







/**
 * Example 0: Input
 */
var props = {
	type: 'text',
	value: 'HELLO WORLD!'
};
//React.render(<input {...props} />, document.body );















/**
 * Example 1: User 
 */
var User = require('./../components/User');
var user_props = {
	avatar_url: 'http://placehold.it/100x100',
	login: 'Joe Bloggs'
};

//React.render(<User avatar_url={ user_props.avatar_url } login={ user_props.login } />, document.body);







/**
 * Example 2: A Commit
 */
var Commit = require('./../components/Commit');
var commit_props = {
	author: user_props,
	commit: {
		message: 'Turned on feature toggling on production',
		author: {
			date: new Date()
		}
	}
}

//React.render(<Commit {...commit_props} />, document.body);



/**
 * Example 3: A repo
 */

var Repo = require('./../components/Repo');
var repo_props = require('./../../data/repos/facebook/flux');
repo_props.commits = require('./../../data/repos/facebook/flux/commits');

React.render(<Repo {...repo_props} />, document.body);