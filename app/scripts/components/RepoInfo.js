/** @jsx React.DOM */
var React = require('react');

var RepoInfo = React.createClass({

  render: function() {
    return (
      <div className="repoInfo">
        <img src={ this.props.owner.avatar_url } />
    		<h2>
    			<strong>{ this.props.full_name }</strong>
    		</h2>
        <span>{ this.props.commit_count } commits today</span>
      </div>
    );
  }

});


module.exports = RepoInfo;