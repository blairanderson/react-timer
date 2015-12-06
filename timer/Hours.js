var React = require('react');
var ReactSelect = require('react-select');

var N = 24;

function mapper(number){
  return {
    value: number+1,
    label: number+1
  };
}

var options = Array.apply(null, {length: N})
              .map(Number.call, Number)
              .map(mapper)

module.exports = React.createClass({
  onChange: function(item){
    var newState = {}
    if (item.value) {
      newState.hours = item.value
    } else {
      newState.hours = 0
    }
    this.props.changeHandler(newState)
  },
  render: function(){
    return (<ReactSelect
      name="hours"
      options={options}
      value={this.props.hours}
      onChange={this.onChange}
    />)
  }
})
