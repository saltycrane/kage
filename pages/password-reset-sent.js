/* @flow */
import * as React from "react";

import Layout from "../components/Layout";
import appEnhancer from "../lib/appEnhancer";

class PasswordResetEmailSendPage extends React.Component<{}> {
  render() {
    return (
      <Layout>
        <h4>Password reset email sent</h4>
        <p>Please follow the instructions in the email to finish resetting your password.</p>
      </Layout>
    );
  }
}

export default appEnhancer(PasswordResetEmailSendPage);
