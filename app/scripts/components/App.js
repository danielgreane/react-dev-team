/** @jsx React.DOM */
var React = require('react');
var Commit = require('./Commit');
var Repo = require('./Repo');
var Header = require('./Header');
var Footer = require('./Footer');
var WidgetArea = require('./widgetArea');

var actions = require('./../actions');
var events = require('../events');
var Store = require('./../Store');


var $ = require('zepto-browserify').$;


var App = React.createClass({

	getInitialState: function() {
		return {
      repos: []
    };
	},

	getDefaultProps: function() {
		return {};
	},

	componentDidMount: function() {
		Store.on(events.REPOS_REFRESHED, this.setRepos)
		//actions.init();
	},

	setRepos: function() {
		this.setState({
			repos: Store.getRepos()
		});
	},

	render: function() {
		return (
			<div className="App">
				<Header />
				{this.state.repos.map(function(repo) {
        	return <Repo key={repo.id} { ...repo } />;
      	})}
				<WidgetArea />
      	<Footer />
      </div>
		);
	}
	
});
	
module.exports = App;
