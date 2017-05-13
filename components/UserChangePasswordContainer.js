/* @flow */
import React from "react";
import { connect } from "react-redux";

import * as actions from "../actions";
import * as selectors from "../reducers";
import type { ApiStatus } from "../types";
import Status from "./Status";
import { ButtonPrimary, FlexRow, Form, FormGroup, H4, Input, Label } from "./common";

const INITIAL_STATE = {
  passwordOld: "",
  passwordNew: "",
  passwordConfirm: "",
};

type Props = {|
  reauthenticate: (password: string) => Object,
  reauthenticateStatus: ApiStatus,
  updatePassword: (password: string) => Object,
  updatePasswordStatus: ApiStatus,
|};

class UserChangePasswordContainer extends React.Component {
  props: Props;
  state = INITIAL_STATE;

  render() {
    const { reauthenticateStatus, updatePasswordStatus } = this.props;
    const { passwordOld, passwordNew, passwordConfirm } = this.state;

    return (
      <div>
        <H4>Change Password</H4>
        <hr />
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Old Password</Label>
            <Input
              name="passwordOld"
              onChange={this.handleChange}
              type="password"
              value={passwordOld}
            />
          </FormGroup>
          <FormGroup>
            <Label>New Password</Label>
            <Input
              name="passwordNew"
              onChange={this.handleChange}
              type="password"
              value={passwordNew}
            />
          </FormGroup>
          <FormGroup>
            <Label>Confirm Password</Label>
            <Input
              name="passwordConfirm"
              onChange={this.handleChange}
              type="password"
              value={passwordConfirm}
            />
          </FormGroup>
          <FlexRow>
            <ButtonPrimary disabled={!this.isValid()} width={165}>Change password</ButtonPrimary>
            <div>
              <Status status={reauthenticateStatus} /><Status status={updatePasswordStatus} />
            </div>
          </FlexRow>
        </Form>
      </div>
    );
  }

  handleChange = (e: Object) => this.setState({ [e.target.name]: e.target.value });

  isValid() {
    const { passwordOld, passwordNew, passwordConfirm } = this.state;
    return passwordOld && passwordNew && passwordNew === passwordConfirm;
  }

  handleSubmit = async (e: Object) => {
    e.preventDefault();
    const { reauthenticate, updatePassword } = this.props;
    const { passwordOld, passwordNew } = this.state;
    await reauthenticate(passwordOld);
    await updatePassword(passwordNew);
    this.setState(INITIAL_STATE);
  };
}

export default connect(
  state => ({
    reauthenticateStatus: selectors.getReauthenticateStatus(state),
    updatePasswordStatus: selectors.getUpdatePasswordStatus(state),
  }),
  {
    reauthenticate: actions.reauthenticate,
    updatePassword: actions.updatePassword,
  },
)(UserChangePasswordContainer);
