/* @flow */
import Router from "next/router";
import * as React from "react";
import { connect } from "react-redux";

import * as actions from "../actions";
import * as selectors from "../reducers";
import type { ApiStatus } from "../types";
import Status from "./Status";
import { ButtonPrimary, Col, Form, FormGroup, Input, Label, Row } from "./common";

type Props = {|
  sendPasswordResetEmail: (email: string) => any,
  status: ApiStatus,
|};

type State = {|
  email: string,
|};

class PasswordResetContainer extends React.Component<Props, State> {
  state = {
    email: "",
  };

  render() {
    const { status } = this.props;
    const { email } = this.state;

    return (
      <Row>
        <Col sm={{ size: 6, offset: 3 }}>
          <h4>Reset password</h4>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label>Enter your email</Label>
              <Input name="email" type="email" value={email} onChange={this.handleChange} />
            </FormGroup>
            <ButtonPrimary>Submit</ButtonPrimary>
            <Status status={status} />
          </Form>
        </Col>
      </Row>
    );
  }

  handleChange = (e: Object) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e: Object) => {
    e.preventDefault();

    const { sendPasswordResetEmail } = this.props;
    const { email } = this.state;
    await sendPasswordResetEmail(email);
    Router.push("/password-reset-sent");
  };
}

export default connect(
  state => ({
    status: selectors.getSendPasswordResetEmailStatus(state),
  }),
  {
    sendPasswordResetEmail: actions.sendPasswordResetEmail,
  },
)(PasswordResetContainer);
