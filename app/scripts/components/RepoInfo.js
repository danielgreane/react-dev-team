/** @jsx React.DOM */
var React = require('react');
var Icon = require('react-font-awesome').Icon;

var RepoInfo = React.createClass({

  getInitialState: function() {
    return {
      shade: 5
    };
  },

  render: function() {
    return (
      <div className="repoInfo" data-shade={ this.state.shade } ref="repoInfo">
        <img src={ this.props.owner.avatar_url } />
    		<h2>
    			<strong>{ this.props.name }</strong>
    		</h2>
        <span>
          by { this.props.owner.login }
        </span>
        <ul>
          <li>
            <Icon type="cog" /> &nbsp;
            <strong>{ this.props.commits.length }</strong> commits today
          </li>
          <li>
            <Icon type="user" /> &nbsp;
            <strong>
              { 'top_committer' in this.props ? this.props.top_committer.data.login : '?' }
            </strong>&nbsp;
            leading with &nbsp;
            { 'top_committer' in this.props ? this.props.top_committer.count : '?' } 
            &nbsp;commits
          </li>
          <li>
            <Icon type="bolt" /> &nbsp;
            average of&nbsp;  
            <strong>
              { 'velocity' in this.props ? this.props.velocity : '?' } mins
            </strong>&nbsp;
            between commits
          </li>
        </ul>
      </div>
    );
  },


});


module.exports = RepoInfo;