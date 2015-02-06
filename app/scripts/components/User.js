/** @jsx React.DOM */
var React = require('react');
var  $ = require('zepto-browserify').$;


var User = React.createClass({

  render: function() {
    return (
      <div className="user">
        <img src={ this.props.avatar_url } />
        <strong>{ this.props.login }</strong>
      </div>
    );
  }

});


module.exports = User;