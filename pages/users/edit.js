/* @flow */
import Router from "next/router";
import * as React from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";
import Layout from "../../components/Layout";
import UserChangePasswordContainer from "../../components/UserChangePasswordContainer";
import UserEditContainer from "../../components/UserEditContainer";
import { Col, Row } from "../../components/common";
import appEnhancer from "../../lib/appEnhancer";
import * as selectors from "../../reducers";
import type { CurrentUser } from "../../types";

type Props = {|
  currentUser: CurrentUser,
  id: string,
|};

class UserEditPage extends React.Component<Props> {
  static async getInitialProps({ dispatch, getState, query: { id }, res }) {
    await dispatch(actions.retrieveUser(id));
    return { id };
  }

  render() {
    const { currentUser, id } = this.props;

    // Redirect if the user is not authorized
    if (typeof window !== "undefined" && (!currentUser || currentUser.uid !== id)) {
      return Router.push(`/users?id=${id}`);
    }

    return (
      <Layout>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <UserEditContainer id={id} />
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <UserChangePasswordContainer id={id} />
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default appEnhancer(
  connect(
    state => ({
      currentUser: selectors.getCurrentUser(state),
    }),
    {},
  )(UserEditPage),
);
