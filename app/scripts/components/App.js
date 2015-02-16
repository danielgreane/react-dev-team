/** @jsx React.DOM */
var React = require('react');
var Commit = require('./Commit');
var Repo = require('./Repo');
var Header = require('./Header');
var WidgetToggle = require('./WidgetToggle');
var TopCommitters = require('./widgets/TopCommitters');

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
		actions.init();
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

				<div className="widgets">
					<TopCommitters number="4" />
				</div>

      	<footer className="footer">
      		<label>Show Widgets: </label>
      		<WidgetToggle name="Top Committers" />
      		<WidgetToggle name="Top Repos" />
      		<WidgetToggle name="Live Commit Stream" />
      		<WidgetToggle name="Test 1" />
      	</footer>
      </div>
		);
	}
	
});
	
module.exports = App;
