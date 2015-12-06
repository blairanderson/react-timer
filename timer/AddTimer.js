var React = require('react');
var Hours = require('./Hours');
var Minutes = require('./Minutes');
var Name = require('./Name');
var Store = require('./Store.js');
var extend = require('extend-object');

var TimerForm = React.createClass({
  getInitialState: function(){
    return {
      hours: 0,
      minutes: 0,
      name: "Timer Name"
    };
  },

  onChange: function(newState){
    this.setState(newState)
  },

  createTimer: function(e){
    e.preventDefault();
    var timer = extend({}, this.state)
    Store.findOrCreateTimer(timer, function(err){
      if (err){
        alert(err)
      } else {
        this.setState(this.getInitialState)
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
        <div style={{width: "35%",float: "left"}}>
          <Hours hours={this.state.hours} changeHandler={this.onChange} />
        </div>
        <div style={{width: "30%",float: "left"}}>
          <Name name={this.state.name} changeHandler={this.onChange} />
        </div>
        <div style={{width: "35%",float: "left"}}>
          <Minutes minutes={this.state.minutes} changeHandler={this.onChange} />
        </div>
        <div style={{content: "",display: 'table',clear: 'both'}}>
          <button onClick={this.props.click}>{"cancel"}</button>
          {createTimer}
          <span>{JSON.stringify(this.state)}</span>
        </div>
      </form>
    </div>);
  }
})

module.exports = React.createClass({
  getInitialState: function(){
    return {editing: true}
  },
  onClick: function(e){
    e.preventDefault()
    this.setState({editing: !this.state.editing})
  },

  render: function() {
    var returnValues = (<div onClick={this.onClick}>
      {"Add Timer"}
    </div>)

    if (this.state.editing) {
      returnValues = (<TimerForm click={this.onClick}/>);
    }

    return (
      <div>
        {returnValues}
      </div>
    )
  }
})
