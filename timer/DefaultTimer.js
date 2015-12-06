var React = require('react');
var AppTimer = require('./AppTimer');

module.exports = React.createClass({
  render: function(){
    if (this.props.timer) {
      return (<AppTimer
        timer={this.props.timer}
        edit={false}
        remove={false}
      />);
    } else {
      return <span/>
    }
  }
});
