# [Kage](https://kage.saltycrane.com)

Yet another task manager built with
[Firebase](https://firebase.google.com/),
[Next.js](https://github.com/zeit/next.js),
[React](https://facebook.github.io/react/),
[Redux](https://github.com/reactjs/redux),
[styled-components](https://github.com/styled-components/styled-components),
[Reactstrap](https://reactstrap.github.io/) [(Bootstrap 4 alpha)](https://v4-alpha.getbootstrap.com/),
[Flow](https://flow.org/), and
[Prettier](https://github.com/prettier/prettier).

### Notes
 - Uses Firebase password authentication, Google authentication, and anonymous authentication when a user does not sign in.
 - Uses the Firebase database to persist tasks.
 - Next.js supports server-side rendering but I'm not taking advantage of this because I could not figure out how to configure Firebase auth on the server side.
 - I'm a fan of using Redux for React applications. I think it makes complicated interactions easy to follow and debug. However, Redux is not good at handling complicated asynchronous side effects. I use [`redux-thunk`](https://github.com/gaearon/redux-thunk) a little to sequence asynchronous actions and `async`+`await` in some places. I tried to keep it's usage to a minimum because it is easy to misuse/overuse. I've [played with](https://github.com/saltycrane/react-chained-modals-comparison) [`redux-saga`](https://github.com/redux-saga/redux-saga) and it seems good. Maybe I will use it if I build something more complicated.
 - Uses my own [`redux-api-memoization`](https://github.com/saltycrane/kage/blob/master/redux-api-memoization.js) helper. It contains promise middleware copied from [Gluestick](https://github.com/TrueCar/gluestick), a reducer to store arguments for "memoization" and API status, and a `memoize` decorator which will prevent firing a promise-based action if has already been fired with the same arguments. "memoization" is in quotes because it does not manage storing the cached data. It only manages whether to dispatch the action or not. Assume the user has stored the data in Redux.
 - Initially I didn't understand how to use styled-components. Later I realized styled components could be used in place of sub objects in a `styles` object for a component when using e.g. Radium or Aphrodite. I like how it makes the JSX look clean. I've heard performance is a weakness of styled-components but they are working to improve it.
 - I'm a former backend developer so I don't know how to make things pretty. I guess I'll go with Bootstrap.
 - Flow has a lot of pain points but in-editor feedback is useful and it helps me write simpler code.
 - Prettier is great.

### Try it
[https://kage.saltycrane.com](https://kage.saltycrane.com)

### Run the dev server

All the commands below were run with Node.js 6.10 and yarn 0.24 on OS X 10.11.

    $ git clone https://github.com/saltycrane/kage.git
    $ cd kage
    $ yarn
    $ yarn dev
    $ # open http://localhost:3000 in the browser

### Run some component benchmarks
Benchmarking code was copied from [threehams](https://github.com/threehams)

    $ git clone https://github.com/saltycrane/kage.git
    $ cd kage
    $ yarn
    $ yarn benchmark

### Run webpack-bundle-analyzer
This doesn't seem to give me the right results. If anyone has any tips, let me know.

    $ git clone https://github.com/saltycrane/kage.git
    $ cd kage
    $ yarn
    $ yarn build
    $ yarn bundle:view

### Run Prettier

    $ git clone https://github.com/saltycrane/kage.git
    $ cd kage
    $ yarn
    $ yarn prettier

### Export a static site

    $ git clone git@github.com:saltycrane/kage.git
    $ cd kage
    $ yarn
    $ yarn export
    $ # serve contents of the `/out` directory

### Deploy to cloud using now

    $ # install now from https://zeit.co/download
    $ git clone https://github.com/saltycrane/kage.git
    $ cd kage
    $ yarn
    $ now
