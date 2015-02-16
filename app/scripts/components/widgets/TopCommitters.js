/** @jsx React.DOM */
var React = require('react');
var Store = require('../../Store');
var User = require('../User');
var events = require('../../events');

var TopCommitters = React.createClass({

  getInitialState: function() {
    return {
      visible: false,
      committers: []
    };
  },

  getDefaultProps: function() {
    return { number: 3 };
  },

  componentDidMount: function() {
    Store.on(events.TOP_COMMITTERS_REFRESHED, this._setCommitters);
  },

  componentWillUnmount: function() {
    
  },

  _setCommitters: function() {
    this.setState({
      committers: Store.getTopCommitters().slice(0, this.props.number)
    });
    console.log(this.state.committers);
  }, 

  render: function() {
    return (
      <div className="widget widget--topCommitters">
        <h2>Top Committers</h2>
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