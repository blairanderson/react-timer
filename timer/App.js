var React = require('react');
var ReactDom = require('react-dom');
var Store = require('./Store.js');
var AddTimer = require('./AddTimer.js');
var AppTimer = require('./AppTimer.js');

var App = React.createClass({
  getInitialState: function(){
    return {
      timers: []
    };
  },

  componentDidMount: function(){
    Store.on('change', this.resetState)
    this.resetState();
  },

  resetState: function(){
    Store.getState(function(err, newState){
      if (err) {
        window.location.reload()
      } else {
        this.setState(newState)
      }
    }.bind(this))
  },

  render: function() {
    var timers = this.state.timers.map(function(timer, index, array){
      return (<li key={index}>
        <AppTimer timer={timer} />
      </li>);
    }.bind(this));

    return (<div>
      <AddTimer />
      <ul>
        {timers}
      </ul>
    </div>);
  }
})


window.configTimer = function configTimer(config){
  var el = document.getElementById(config.el)
  ReactDom.render(<App start={new Date()} />, el)
}
