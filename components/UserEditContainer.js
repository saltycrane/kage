/* @flow */
import React from "react";
import { connect } from "react-redux";

import * as actions from "../actions";
import * as selectors from "../reducers";
import ReauthenticateModalContainer from "../components/ReauthenticateModalContainer";
import type { ApiStatus, User } from "../types";
import Status from "./Status";
import { AuthLabel, ButtonPrimary, FlexRow, Form, FormGroup, H3, Input } from "./common";

type Props = {|
  token: string,
  updateEmail: Function,
  updateEmailStatus: ApiStatus,
  updateUser: Function,
  updateUserStatus: ApiStatus,
  user: User,
|};

class UserEditContainer extends React.Component {
  props: Props;
  state: {|
    email: string,
    username: string,
  |};

  constructor(props: Props) {
    super(props);
    this.state = {
      email: props.user.email,
      username: props.user.username || "",
    };
  }

  render() {
    const { updateEmailStatus, updateUserStatus } = this.props;
    const { email, username } = this.state;

    return (
      <div style={{ marginBottom: 20 }}>
        <H3>Edit User Profile</H3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <AuthLabel>Email</AuthLabel>
            <Input name="email" onChange={this.handleChange} value={email} />
          </FormGroup>
          {false && (
            <FormGroup>
              <AuthLabel>Username</AuthLabel>
              <Input name="username" onChange={this.handleChange} value={username} />
            </FormGroup>
          )}
          <FlexRow>
            <ButtonPrimary width={165}>Save changes</ButtonPrimary>
            <div>
              <Status status={updateEmailStatus} />
              <Status status={updateUserStatus} />
            </div>
          </FlexRow>
        </Form>
        <ReauthenticateModalContainer onSuccess={this.handleSubmit} />
      </div>
    );
  }

  handleChange = (e: Object) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e: ?Object) => {
    e && e.preventDefault();
    const { token, updateEmail, updateUser, user } = this.props;
    const { email, username } = this.state;

    const result = await updateEmail(email);
    if (result) {
      updateUser(user.id, { email, username }, token);
    }
  };
}

export default connect(
  (state, ownProps) => ({
    token: selectors.getToken(state),
    updateEmailStatus: selectors.getUpdateEmailStatus(state),
    updateUserStatus: selectors.getUpdateUserStatus(state),
    user: selectors.getUser(state, ownProps.id),
  }),
  {
    updateEmail: actions.updateEmail,
    updateUser: actions.updateUser,
  },
)(UserEditContainer);
