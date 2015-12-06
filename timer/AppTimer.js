var React = require('react');
var Store = require('./Store');
var Timer = require('./timer');

module.exports = React.createClass({
  getDefaultProps: function(){
    return {
      edit: true,
      remove: true
    }
  },

  getInitialState: function(){
    return {
      timerText: '',
      started: false
    };
  },

  componentDidMount: function(){
    this.timer = new Timer({
      hours: this.props.timer.hours,
      minutes: this.props.timer.minutes,
      updateText: this.updateText
    });
  },

  updateText: function(text) {
    return this.setState({
      started: true,
      timerText: text
    });
  },

  onRemove: function(e){
    e.preventDefault()
    if (confirm('Are you sure you want to delete this timer?')) {
      Store.remove(this.props.timer)
    }
  },

  onStart: function(e){
    e.preventDefault()
    this.setState({started: true}, function(){
      this.timer.start()
    }.bind(this))
  },

  render: function(){
    var name = this.props.timer.name,
        hours = this.props.timer.hours,
        minutes = this.props.timer.minutes,
        startStop,
        edit,
        remove;

    if (this.state.started) {
      startStop = (<button onClick={this.onStop}>{"stop"}</button>);
    } else {
      startStop = (<button onClick={this.onStart}>{"start"}</button>);
    }

    if (this.props.edit) {
      edit = <button onClick={this.onEdit}>{"edit"}</button>
    } else {
      edit = <span/>
    }

    if (this.props.remove) {
      remove = <button onClick={this.onRemove}>{"remove"}</button>
    } else {
      remove = <span/>
    }

    return (<div>
      <div style={{float: "right"}}>
        <span>{this.state.timerText}</span>
        <span>
          {startStop}
          {edit}
          {remove}
        </span>
      </div>
      <p>{name}</p>
    </div>);
  }
});
