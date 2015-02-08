/** @jsx React.DOM */
var timeago = require('timeago');

var React = require('react');
var User = require('./User');

var Commit = React.createClass({


  getInitialState: function() {
    var timeSince = timeago(this.props.commit.author.date);
    return {
      timeSinceCommit: timeSince.replace('about', '~')
    }
  },

	getDefaultProps: function() {
    return {};
  },

  componentWillMount: function() {
    this.interval = setInterval(this._updateTimeSinceCommit, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  _updateTimeSinceCommit: function() {
    this.setState(this.getInitialState());
  },

  _getShortMessage: function() {
    var msg = this.props.commit.message;
    if (msg.length > 100)
      return msg.substr(0,100).concat('...');
    else
      return msg;
  },


  render: function() {
    return (
      <div className="commit" data-visibility={ this.props.opacity }>
        <User {...this.props.author} />
        <strong>{ this._getShortMessage() }</strong>
        <span>{ this.state.timeSinceCommit }</span>
      </div>
    )
  }

});


module.exports = Commit;