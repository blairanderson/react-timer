var React = require('react');
var AppTimer = require('./AppTimer');

module.exports = React.createClass({
  render: function(){
    var timers,
        result = (<span/>);

    if (this.props.timer) {
      result = (<AppTimer
        timer={this.props.timer}
        edit={false}
        remove={false}
      />);
    }

    if (this.props.timers) {
      timers = this.props.timers.map(function(timer, index){
        return (<AppTimer
          key={index}
          timer={timer}
          edit={false}
          remove={false}
        />);
      })
      result = (<div>
        {timers}
      </div>);

    }
    return result
  }
});
