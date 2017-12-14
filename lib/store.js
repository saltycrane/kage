/* @flow */
import * as React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import reducer from "../reducers";
import promiseMiddleware from "./promiseMiddleware";

// helper to create redux store for Next.js isomorphic apps
const initStore = (reducer, initialState, isServer) => {
  const middleware = [promiseMiddleware, thunk];

  if (isServer && typeof window === "undefined") {
    return createStore(reducer, initialState, applyMiddleware(...middleware));
  } else {
    if (!window.store) {
      const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      window.store = createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleware)),
      );
    }
    return window.store;
  }
};

// higher order component (HOC) to set up the redux store for components
// to share here: https://github.com/zeit/next.js/issues/424
export const withRedux = (WrappedComponent: React.ComponentType<*>) => {
  return class EnhancedComponent extends React.Component<Object> {
    store: Object;

    // $FlowFixMe
    static displayName = `withRedux(${WrappedComponent.displayName || WrappedComponent.name}`;

    static async getInitialProps(context) {
      const { req } = context;
      const isServer = !!req;
      const store = initStore(reducer, undefined, isServer);

      let wrappedInitialProps = {};
      if (WrappedComponent.getInitialProps) {
        context = {
          ...context,
          dispatch: store.dispatch,
          getState: store.getState,
        };
        // $FlowFixMe
        wrappedInitialProps = await WrappedComponent.getInitialProps(context);
      }

      return {
        ...wrappedInitialProps,
        initialState: store.getState(),
        isServer,
      };
    }

    constructor(props: Object) {
      super(props);
      this.store = initStore(reducer, props.initialState, props.isServer);
    }

    render() {
      return (
        <Provider store={this.store}>
          <WrappedComponent {...this.props} />
        </Provider>
      );
    }
  };
};
