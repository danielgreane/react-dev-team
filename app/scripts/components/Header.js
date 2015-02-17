/** @jsx React.DOM */
var React = require('react');
var Icon = require('react-font-awesome').Icon;

var Header = React.createClass({

  getInitialState: function() {
    return {
      className: '--flat',
      shade: 0
    };
  },

  componentDidMount: function() {
    window.addEventListener('scroll', this._adjustColor, false);
    window.addEventListener('scroll', this._adjustBg, false);
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this._adjustBg, false);
  },

  _adjustBg: function(e) {
    if (window.scrollY < 20) {
      this._className = '';
    } else {
      this._className = '';
    }
    this.setState({
      className: (window.scrollY < 20 ? '--flat' : '--arching')
    });
  },

  _adjustColor: function(e) {
    var node = this.refs.header.getDOMNode();
    var shade = Math.round(window.scrollY / node.offsetHeight);
    shade = Math.min(6, shade);
    this.setState({
      shade: shade
    });
  },


  render: function() {
    return (
      <header 
        ref="header" 
        className={ 'header header' + this.state.className }
        data-shade={ this.state.shade }
        />
      );
  },


});


module.exports = Header;