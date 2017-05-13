/* @flow */
import React from "react";

import * as actions from "../../actions";
import Layout from "../../components/Layout";
import UserChangePasswordContainer from "../../components/UserChangePasswordContainer";
import UserEditContainer from "../../components/UserEditContainer";
import { Col, Row } from "../../components/common";
import appEnhancer from "../../lib/appEnhancer";
import redirect from "../../lib/redirect";
import * as selectors from "../../reducers";

class UserEditPage extends React.Component {
  static async getInitialProps({ dispatch, getState, query: { id }, res }) {
    const currentUser = selectors.getCurrentUser(getState());
    if (!currentUser || currentUser.uid !== id) {
      return redirect(`/users?id=${id}`, res);
    }
    await dispatch(actions.retrieveUser(id));
    return { id };
  }

  render() {
    const { id } = this.props;
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

export default appEnhancer(UserEditPage);
