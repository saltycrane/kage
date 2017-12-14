/* @flow */
import Router from "next/router";
import * as React from "react";
import { connect } from "react-redux";

import * as actions from "../actions";
import * as firebase from "./firebase";
import { withRedux } from "./store";

function withListeners(WrappedComponent: React.ComponentType<*>) {
  class EnhancedComponent extends React.Component<$FlowFixMeProps> {
    static getInitialProps = WrappedComponent.getInitialProps;
    static displayName = `withListeners(${WrappedComponent.displayName || WrappedComponent.name}`;

    componentDidMount() {
      const { retrieveTasks, routeChanged, storeAuth } = this.props;

      /**
       * Use firebase observer to dispatch the `authStateChanged` action when
       * the auth state changes. Adds `user` to the wrapped component's props.
       */
      firebase.onAuthStateChanged(async firebaseUser => {
        const auth = await storeAuth(firebaseUser);
        if (auth.uid) {
          retrieveTasks(auth);
        }
      });

      /**
       * Dispatch the routeChanged action when the route changes.
       */
      Router.onRouteChangeComplete = url => {
        routeChanged(url);
      };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return connect(state => ({}), {
    retrieveTasks: actions.retrieveTasks,
    routeChanged: actions.routeChanged,
    storeAuth: actions.storeAuth,
  })(EnhancedComponent);
}

export default (WrappedComponent: React.ComponentType<*>) => withRedux(withListeners(WrappedComponent));
