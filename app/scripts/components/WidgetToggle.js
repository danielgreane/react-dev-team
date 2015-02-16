/** @jsx React.DOM */
var React = require('react');
var Icon = require('react-font-awesome').Icon;

var WidgetToggle = React.createClass({

  getInitialState: function() {
    return {
      checked: false
    };
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function() {
  },

  toggle: function() {
    var checked = !this.state.checked;
    this.setState({
      checked: checked
    });
  },

  render: function() {
    return (
      <div className="widgetToggle" onClick={ this.toggle }>
        <i className={  this.state.checked ? 'fa fa-check-square' : 'fa fa-square-o' } /> 
        { this.props.name }
      </div>
    );
  },


});


module.exports = WidgetToggle;