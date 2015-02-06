/** @jsx React.DOM */
var timeago = require('timeago');

var React = require('react');
var User = require('./User');

var Commit = React.createClass({

	getDefaultProps: function() {
    return {
      author: require('./../../json/author.json')
    };
  },

  render: function() {
    return (
      <div className="commit">
      	<strong>{ this.props.commit.message }</strong>
      	<span>{ timeago(this.props.commit.author.date) }</span>
        <User {...this.props.author} />
      </div>
    )
  }

});


module.exports = Commit;