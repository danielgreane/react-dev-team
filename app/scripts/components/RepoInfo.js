/** @jsx React.DOM */
var React = require('react');

var RepoInfo = React.createClass({

  render: function() {
    return (
      <div className="repoInfo">
        <img src={ this.props.owner.avatar_url } />
		<h2>
			<strong>{ this.props.full_name }</strong>
			<span>({ this.props.open_issues_count } open issues)</span>
		</h2>
      </div>
    );
  }

});


module.exports = RepoInfo;