/* @flow */
import * as React from "react";

import * as actions from "../../actions";
import Layout from "../../components/Layout";
import UserProfileContainer from "../../components/UserProfileContainer";
import { Col, Row } from "../../components/common";
import appEnhancer from "../../lib/appEnhancer";

type Props = {|
  id: string,
|};

class UserProfilePage extends React.Component<Props> {
  static async getInitialProps({ dispatch, query: { id } }) {
    await dispatch(actions.retrieveUser(id));
    return { id };
  }

  render() {
    const { id } = this.props;
    return (
      <Layout>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <UserProfileContainer id={id} />
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default appEnhancer(UserProfilePage);
