var GreeterComponent = React.createClass({

  getInitialState: function() {
    return(
      {name: this.props.name || 'World'}
    );
  },

  render: function() {
    return(
      <div>
        <p>I am the greeter component.</p>
        <p>Hello, {this.state.name}!</p>
      </div>
    );
  }
});
