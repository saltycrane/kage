/* @flow */
import React from "react";

import NavHeaderContainer from "../components/NavHeaderContainer";
import { Col, Container, Row } from "./common";

type Props = {|
  children?: any,
  isIndex?: boolean,
|};

const Layout = ({ children, isIndex = false, user }: Props) => (
  <div>
    <NavHeaderContainer isIndex={isIndex} />
    <Container>
      <Row>
        <Col>
          {children}
        </Col>
      </Row>
    </Container>
  </div>
);

export default Layout;
