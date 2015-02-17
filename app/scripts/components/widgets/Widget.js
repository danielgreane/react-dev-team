/** @jsx React.DOM */
var React = require('react');
var Store = require('../../Store');
var User = require('../User');
var Icon = require('react-font-awesome').Icon;
var events = require('../../events');

var TopRepos = React.createClass({

  getInitialState: function() {
    return {
      visible: this.props.initiallyVisible,
    };
  },

  getDefaultProps: function() {
    return { 
      id: '',
      label: '',
      initiallyVisible: false
    };
  },

  componentDidMount: function() {
    Store.on(events.WIDGETS_TOGGLED, this._setVisibility.bind(this));
  },

  componentWillUnmount: function() {
    Store.off(events.WIDGETS_TOGGLED, this._setVisibility);
  },

  _setVisibility: function(e) {
    this.setState({
      visible: Store.getWidget(this.props.id).visible
    });
  },

  _getClassNames: function() {
    return 'widget ' 
      + 'widget--' + (this.props.id) + ' ' 
      + (this.state.visible ? 'widget--visible' : 'widget--hidden') 
  },

  render: function() {
    return (
      <div className={ this._getClassNames() }>
        { this.props.children }
      </div>
    );
  },


});


module.exports = TopRepos;