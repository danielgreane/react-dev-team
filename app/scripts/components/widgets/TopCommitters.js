/** @jsx React.DOM */
var React = require('react');
var Store = require('../../Store');
var User = require('../User');
var Icon = require('react-font-awesome').Icon;
var events = require('../../events');

var TopCommitters = React.createClass({

  getInitialState: function() {
    return {
      visible: true,
      committers: []
    };
  },

  getDefaultProps: function() {
    return { 
      number: 3,
      name: ''
    };
  },

  componentDidMount: function() {
    Store.on(events.TOP_COMMITTERS_REFRESHED, this._setCommitters);
    Store.on(events.WIDGETS_TOGGLED, this._setVisibility);
  },

  componentWillUnmount: function() {
    
  },

  _setCommitters: function() {
    this.setState({
      committers: Store.getTopCommitters().slice(0, this.props.number)
    });
  }, 

  _setVisibility: function(e) {
    this.setState({
      visible: Store.getWidget(this.props.name).visible
    });
  },

  render: function() {
    return (
      <div className={'widget widget--topCommitters ' + (this.state.visible ? 'widget--visible' : 'widget--hidden')}>
        <h2>
          <Icon type="star" />&nbsp;
          Top Committers
        </h2>
        {
          this.state.committers.map(function(user, i) {
          return (
              <div key={ user.data.id } className="widget--topCommitters__entry">
                <label>{i + 1}</label>
                <User {...user.data} /> 
                <span>({user.count} commits)</span>
              </div>
            )
          })
        }
      </div>
    );
  },


});


module.exports = TopCommitters;