/** @jsx React.DOM */
var React = require('react');
var Store = require('../../Store');
var User = require('../User');
var Icon = require('react-font-awesome').Icon;
var events = require('../../events');
var _ = require('underscore');

var TopRepos = React.createClass({

  getInitialState: function() {
    return {
      repos: []
    };
  },


  componentDidMount: function() {
    Store.on(events.COMMITS_REFRESHED, this._setRepos);
    Store.on(events.REPOS_REFRESHED, this._setRepos);
  },

  componentWillUnmount: function() {
    Store.offAll(events.COMMITS_REFRESHED);
  },

  _setRepos: function() {
    this.setState({
      repos: _.sortBy(Store.getRepos(), r => r.commits.length)
    });
  }, 

  render: function() {
    return (
      <div className="widget--topRepos">
        <h2>
          <Icon type="folder" />&nbsp;
          Top Repos
        </h2>
        {
          this.state.repos.map(function(repo, i) {
          return (
              <div key={ repo.id } className="widget--topRepos__entry">
                <label>{i + 1}</label>
                <User avatar_url={ repo.owner.avatar_url } login={ repo.name } /> 
                <span>({repo.commits.length} commits)</span>
              </div>
            )
          })
        }
      </div>
    );
  },


});


module.exports = TopRepos;