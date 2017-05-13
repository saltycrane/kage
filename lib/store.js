/* @flow */
import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { middleware as apiMemoizationMiddleware } from "../redux-api-memoization";
import reducer from "../reducers";

// helper to create redux store for Next.js isomorphic apps
const initStore = (reducer, initialState, isServer) => {
  const middleware = [apiMemoizationMiddleware, thunk];

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
export const withRedux = (WrappedComponent: ReactClass<*>) => {
  return class EnhancedComponent extends React.Component {
    store: Object;

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
