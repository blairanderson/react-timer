var React = require('react');
var extend = require('extend-object');
var Hours = require('./Hours');
var Minutes = require('./Minutes');
var Name = require('./Name');
var Store = require('./Store');
var ClearFloat = require('./ClearFloat')

module.exports = React.createClass({
  getInitialState: function(){
    return {
      hours: 0,
      minutes: 0,
      name: undefined
    };
  },

  onChange: function(newState, cb){
    if (typeof cb === 'function') {
      this.setState(newState, cb)
    } else {
      this.setState(newState)
    }
  },

  createTimer: function(e){
    e.preventDefault();

    Store.findOrCreateTimer(extend({}, this.state), function(err){
      if (err){
        alert(err)
      } else {
        this.setState(this.getInitialState())
      }
    }.bind(this))
  },

  render: function(){
    var createTimer;
    if (this.state.hours > 0 || this.state.minutes > 0 ) {
      createTimer = <button onClick={this.createTimer}>{"Create Timer"}</button>
    }

    return (<div>
      <form>
        <div style={{width: "30%",float: "left"}}>
          <label>{"Name"}</label>
          <Name name={this.state.name} changeHandler={this.onChange} />
        </div>
        <div style={{width: "35%",float: "left"}}>
          <label>{"Hours"}</label>
          <Hours hours={this.state.hours} changeHandler={this.onChange} />
        </div>
        <div style={{width: "35%",float: "left"}}>
          <label>{"Minutes"}</label>
          <Minutes minutes={this.state.minutes} changeHandler={this.onChange} />
        </div>
        <ClearFloat />
        <div>
          {createTimer}
          <span>{JSON.stringify(this.state)}</span>
          <span style={{float: "right"}}>
            <button onClick={this.props.click}>{"cancel"}</button>
          </span>
        </div>
      </form>
    </div>);
  }
})
