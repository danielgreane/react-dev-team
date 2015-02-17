/** @jsx React.DOM */
var React = require('react');
var Store = require('../Store');
var User = require('./User');
var Widget = require('./widgets/Widget');
var Icon = require('react-font-awesome').Icon;
var events = require('../events');


var TopCommitters = require('./widgets/TopCommitters.widget');
var TopRepos = require('./widgets/TopRepos.widget');




var WidgetArea = React.createClass({
	render: function() {
		return (
			<div className="widgets">
				<Widget id="topCommitters" initiallyVisible="true">
						<TopCommitters number="4" />
				</Widget>

				<Widget id="topRepos" initiallyVisible="true">
						<TopRepos number="4" />
				</Widget>
			</div>
		);
	}
});

module.exports = WidgetArea;