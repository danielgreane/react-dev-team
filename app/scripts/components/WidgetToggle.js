/** @jsx React.DOM */
var React = require('react');
var Icon = require('react-font-awesome').Icon;
var actions = require('../actions');

var WidgetToggle = React.createClass({

  getDefaultProps: function() {
  },

  getInitialState: function() {
    return {
      checked: this.props.initiallyChecked
    };
  },

  componentDidMount: function() {
    console.log('WidgetToggle mounted', this.props);
  },

  componentWillUnmount: function() {
  },

  toggle: function() {
    var checked = !this.state.checked;
    actions.toggleWidget(this.props.id, checked);
    this.setState({
      checked: checked
    });
  },

  render: function() {
    return (
      <div className="widgetToggle" onClick={ this.toggle }>
        <i className={  this.state.checked ? 'fa fa-check-square' : 'fa fa-square-o' } /> 
        { this.props.label }
      </div>
    );
  },


});


module.exports = WidgetToggle;