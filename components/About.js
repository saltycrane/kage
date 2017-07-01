/* @flow */
import React from "react";
import styled from "styled-components";

import Link from "./Link";
import { A, ButtonPrimary, H3 } from "./common";

const About = () =>
  <div>
    <H3>About</H3>
    <P>
      Yet another task manager built with <A href="https://firebase.google.com/">Firebase</A>
      , <A href="https://github.com/zeit/next.js">Next.js</A>
      , <A href="https://facebook.github.io/react/">React</A>
      , <A href="https://github.com/reactjs/redux">Redux</A>
      , <A href="https://github.com/styled-components/styled-components">styled-components</A>
      , <A href="https://reactstrap.github.io/">Reactstrap</A>{" "}
      <A href="https://v4-alpha.getbootstrap.com/">(Bootstrap 4 alpha)</A>
      , <A href="https://flow.org/">Flow</A>
      , and <A href="https://github.com/prettier/prettier">Prettier</A>.
    </P>
    <P>
      Code: <A href="https://github.com/saltycrane/kage">https://github.com/saltycrane/kage</A>
    </P>
    <Link href="/">
      <ButtonPrimary>Manage some tasks</ButtonPrimary>
    </Link>
  </div>;

const P = styled.p`font-weight: 200;`;

export default About;
