/** @jsx React.DOM */
var React = require('react');
var Commit = require('./Commit');
var MagicMove = require('./MagicMove');
var RepoInfo = require('./RepoInfo');

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
  		commits: require('./../../json/commits.json')
  	};
  },
 	
 	componentDidMount: function() {
 		console.log('COMMITS: ', this.props);
 	},


  render: function() {
    return (
      <div className="repo">
    		<RepoInfo { ...this.props } />
				{this.props.commits.map(function(commit) {
					return <Commit key={ commit.sha } { ...commit } />;
        })}
      </div>
    );
  }

});


module.exports = Repo;