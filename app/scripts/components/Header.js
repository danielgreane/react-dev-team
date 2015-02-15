/** @jsx React.DOM */
var React = require('react');
var Icon = require('react-font-awesome').Icon;

var Header = React.createClass({

  getInitialState: function() {
    return {
      className: '--flat'
    };
  },

  componentDidMount: function() {
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

  render: function() {
    return (
      <header className={ 'header header' + this.state.className }>
      </header>
    );
  },


});


module.exports = Header;