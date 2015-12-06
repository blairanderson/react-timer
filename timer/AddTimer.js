var React = require('react');
var TimerForm = require('./TimerForm');

module.exports = React.createClass({
  getInitialState: function(){
    return {editing: true}
  },
  onClick: function(e){
    e.preventDefault()
    this.setState({editing: !this.state.editing})
  },

  render: function() {
    var timerStyle = {
      display: this.state.editing ? "block" : "none"
    }

    var buttonStyle = {
      display: this.state.editing ? "none" : "block",
      textAlign: "right"
    }
    
    return (
      <div>
        <div style={buttonStyle}>
          <button onClick={this.onClick}>{"Add Timer"}</button>
        </div>
        <div style={timerStyle}>
          <TimerForm click={this.onClick}/>
        </div>
      </div>
    )
  }
})
