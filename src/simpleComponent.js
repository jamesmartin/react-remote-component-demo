var SimpleComponent = React.createClass({

  getInitialState: function() {
    return(
      {value: ''}
    );
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  render: function() {
    return(
      <div>
        <p>I am a simple component.</p>
        <p>My input value is: <strong>{this.state.value}</strong></p>
        <input type='text' value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }
});
