/* @flow */
import React from "react";

import Layout from "../components/Layout";
import PasswordResetContainer from "../components/PasswordResetContainer";
import appEnhancer from "../lib/appEnhancer";

class PasswordResetPage extends React.Component {
  render() {
    return (
      <Layout>
        <PasswordResetContainer />
      </Layout>
    );
  }
}

export default appEnhancer(PasswordResetPage);
