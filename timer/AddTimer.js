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
    var returnValues = (<button onClick={this.onClick}>
      {"Add Timer"}
    </button>)

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
