/** @jsx React.DOM */
var React = require('react');
var Icon = require('react-font-awesome').Icon;
var WidgetToggle = require('./WidgetToggle');
var Store = require('../Store');
var actions = require('../actions');

var Footer = React.createClass({

  getDefaultProps: function() {
    return {
      widgets: Store.getWidgets()
    };
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function() {
  },

  render: function() {
    return (
      <footer className="footer">
        <label>Show Widgets: </label>
        {this.props.widgets.map(function(w, k) {
          return <WidgetToggle label={ w.label }  initiallyChecked={ w.visible }  id ={ w.id }  />
        })}
      </footer>
    );
  },


});


module.exports = Footer;