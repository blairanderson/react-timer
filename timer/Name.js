var React = require('react');

module.exports = React.createClass({
  onChange: function(e){
    this.props.changeHandler({name: e.target.value})
  },

  render: function(){
    return (<div className="Select">
      <div className="Select-control">
        <input
          value={this.props.name}
          onChange={this.onChange}
          style={{width: '100%',height: '34px',boxSizing: 'border-box',border: 'none'}}
        />
      </div>
    </div>)
  }
})
