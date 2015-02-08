/** @jsx React.DOM */
var React = require('react');
var Commit = require('./Commit');
var MagicMove = require('./MagicMove');
var RepoInfo = require('./RepoInfo');

var Store = require('./../Store');
var events = require('./../events');

var _ = require('underscore');
var  $ = require('zepto-browserify').$;

var Repo = React.createClass({

	/* -- Property definitions here -- */
	propTypes: {
    commits: React.PropTypes.array
  },


  getInitialState: function() {
  	return {};
  },

  getDefaultProps: function() {
  	return {
  		
  	};
  },
 	
 	componentDidMount: function() {
    
 	},




  render: function() {
    return (
      <div className="repo">
    		<RepoInfo { ...this.props } commit_count={ this.props.commits.length } />
        { this._renderCommit() }
      </div>
    );
  },

  _renderCommit: function() {
    var opacity;
    return this.props.commits.map(function(commit, i) {
      opacity = i / this.props.commits.length;
      return (
        <Commit 
          key = {commit.sha} 
          opacity = { Math.round(opacity * 100)} 
          {...commit} 
        />
      )
    }.bind(this));
  }

});


module.exports = Repo;