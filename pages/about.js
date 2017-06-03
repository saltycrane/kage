/* @flow */
import React from "react";

import About from "../components/About";
import Layout from "../components/Layout";
import appEnhancer from "../lib/appEnhancer";

class AboutPage extends React.Component {
  render() {
    return (
      <Layout>
        <About />
      </Layout>
    );
  }
}

export default appEnhancer(AboutPage);
