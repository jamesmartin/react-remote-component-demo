# React Remote Components - A Demonstration

What if, we could reuse React components by dynamically loading them from remote URLs?

This is a demonstration of just such a technique.

## Running the demo

1. Clone this repository
1. Install the React tools: `npm install --global react-tools`
1. Optionally install a live reloading server: `npm install --global live-server`
1. Compile the JSX source files to the build directory: `jsx --watch src/ build/`
1. Optionally run the live reloading server: `live-server`
1. Visit the test HTML ([http://127.0.0.1:8080/test.html](http://127.0.0.1:8080/test.html)) page to see the result.

## What's happening here?

We create two simple example React components, named [`SimpleComponent`](./src/simpleComponent.js) and [`GreeterComponent`](./src/greeterComponent.js). These components are not very interesting by React standards and their behavior is purely illustrative. The important thing, is that we want to load these components remotely — e.g. at runtime, via an Ajax request.

To get started, in our main [app.js](./src/app.js) file, we declare a simple Javacript object that describes the `name`s of our remote components, their `src` URLs and optional `props` that can be passed to them.

We pass our list of `remoteComponents` to the `loadRemoteComponents` function, which returns a `Promise.all` that in turn returns an array of fulfilled promises, each returned from the `loadComponent` function.

The `loadComponent` function is where things get interesting. We take the `name` and `src` URL from a component (e.g. `GreeterComponent` and `./build/greeterComponent.js`) and we make an `XMLHttpRequest` to the `src` URL to retreive the source code of our `GreeterComponent`. ***Note:*** this remotely fetched source code is from the `./build/` directory, which means it has already been compiled by `jsx`.

Once the compiled component code has been fetched from the remote, we evaluate the code in the [global context](http://perfectionkills.com/global-eval-what-are-the-options/) of `window`. ***Note:*** this technique will probably need some refinement to cater to older browsers (E.g. IE6 et al).

The `loadComponent` function finally resolves its promise, returning an object containing a reference to the actual name of the newly evaluated component and any properties specified: E.g. `{name: GreeterComponent, props: {name: 'Bob'}}`.

When all the `loadComponent` promises have been resolved, we call the `.then(loadApp)` passing in the list of objects containing references to the newly evaluated remote components.

The `loadApp` function, calls `React.render`, inserting a single parent React component (`MainComponent`) into the DOM, passing in the remote components as the `children` property.

The `MainComponent` React component renders itself and then renders each of its children using `React.createElement`.

## So what?

This is a demonstration, partly to satisfy my curiosity that it could be done, and partly because I actually want to use this technique to provide "hot loaded" code in projects that are not necessarily ready for React and modern Javascript build tools (E.g. Ruby on Rails).
