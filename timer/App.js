var React = require('react');
var ReactDom = require('react-dom');
var Store = require('./Store');
var AddTimer = require('./AddTimer');
var AppTimer = require('./AppTimer');
var DefaultTimer = require('./DefaultTimer');

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
      return (<AppTimer key={index} timer={timer} />);
    }.bind(this));

    return (<div>
      <AddTimer />
      <ul style={{listStyle: 'none',paddingLeft: '0', margin: '0'}}>
        <DefaultTimer
          timer={this.props.timer}
          timers={this.props.timers}
        />
        {timers}
      </ul>
      <div>
        <audio id="beepbeep" style={{display: "none"}} preload="auto" autobuffer>
          <source src="https://cdn.rawgit.com/blairanderson/react-timer/master/public/beepbeep.mp3" type="audio/mpeg" />
          <source src="https://cdn.rawgit.com/blairanderson/react-timer/master/public/beepbeep.ogg" type="audio/ogg" />
        </audio>
      </div>
    </div>);
  }
})


window.configTimer = function configTimer(config){
  var el = document.getElementById(config.el)
  ReactDom.render(<App {...config} />, el)
}
