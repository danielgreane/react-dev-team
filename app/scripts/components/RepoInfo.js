/** @jsx React.DOM */
var React = require('react');
var Icon = require('react-font-awesome').Icon;

var RepoInfo = React.createClass({

  getInitialState: function() {
    return {
      shade: 5
    };
  },

  componentDidMount: function() {
    window.addEventListener('scroll', this._adjustColor, false);
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this._adjustColor, false);
  },

  _adjustColor: function(e) {
    var node = this.refs.repoInfo.getDOMNode();
    var shade = Math.round(window.scrollY / node.offsetHeight);
    shade = Math.min(6, shade);
    this.setState({
      shade: shade
    });
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
              { this.props.top_committer.data.login }
            </strong>&nbsp;
            leading with { this.props.top_committer.count } commits
          </li>
          <li>
            <Icon type="bolt" /> &nbsp;
            velocity of <strong>XX</strong> commits / hour
          </li>
        </ul>
      </div>
    );
  },


});


module.exports = RepoInfo;