var MainComponent = React.createClass({
  children: function() {
    return(
      _.map(this.props.children, function(child, index) {
        return React.createElement(child.name, _.merge(child.props, {key: index}));
      })
    );
  },

  render: function() {
    return(
      <div>
        <h1>Main</h1>
        {this.children()}
      </div>
    );
  }
});

var remoteComponents = [
  {
    name: 'SimpleComponent',
    src: '/build/simpleComponent.js'
  },
  {
    name: 'GreeterComponent',
    src: '/build/greeterComponent.js',
    props: {name: 'Bob'}
  }
];

var loadRemoteComponent = function(component) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();

    request.onload = function() {
      if(request.status >= 200 && request.status < 400) {
        var remoteComponentSrc = request.responseText;
        window.eval(remoteComponentSrc);
        return resolve({name: eval(component.name), props: component.props || {}});
      } else {
        return reject();
      }
    };

    request.open('GET', component.src);
    request.send();
  });
};

var loadRemoteComponents = function(components) {
  return Promise.all(
    _.map(components, function(component) {
      console.log(component.name, component.src);
      return loadRemoteComponent(component);
    })
  );
};

var loadApp = function(children) {
  React.render(
    React.createElement(MainComponent, {children: children}),
    document.getElementById('main')
  );
};

loadRemoteComponents(remoteComponents)
.then(loadApp)
.catch(function(err) {
  console.log("Something went wrong: " + err);
});

