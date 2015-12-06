var React = require('react');

module.exports = React.createClass({
  onCancel: function(e){

  },
  render: function(){
    var name = this.props.timer.name,
        hours = this.props.timer.hours,
        minutes = this.props.timer.minutes;

    return (<div>
      <p>{name}</p>
      <div>
        <span>hours: {hours}</span>
        <span>minutes: {minutes}</span>
        <button onClick={this.onCancel}>{"cancel"}</button>
      </div>
    </div>);
  }
});
