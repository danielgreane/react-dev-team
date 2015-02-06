/** @jsx React.DOM */
var React = require('react');
var Commit = require('./Commit');
var Repo = require('./Repo');
var $ = require('zepto-browserify').$;


var App = React.createClass({

	getInitialState: function() {
		return {
      
    };
	},

	getDefaultProps: function() {
		return {
      repo: require('./../../json/repo.json')
    };
	},

	componentDidMount: function() {
		
	},

	render: function() {
		return (
			<div>
        <Repo { ...this.props.repo } />
      </div>
		);
	}
	
});
	
module.exports = App;
