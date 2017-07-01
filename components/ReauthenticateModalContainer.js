/* @flow */
import React from "react";
import { connect } from "react-redux";

import * as actions from "../actions";
import * as selectors from "../reducers";
import type { ApiStatus, SelectedModal } from "../types";
import Status from "./Status";
import {
  Button,
  ButtonPrimary,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "./common";

type Props = {|
  hideModal: () => Object,
  onSuccess: any => any,
  reauthenticate: (password: string) => Object,
  selectedModal: SelectedModal,
  status: ApiStatus,
|};

class ReauthenticateModalContainer extends React.Component {
  props: Props;

  state = {
    password: "",
  };

  render() {
    const { selectedModal, status } = this.props;
    const { password } = this.state;

    return (
      <Modal isOpen={selectedModal === "reauth"} toggle={this.handleCancel}>
        <Form onSubmit={this.handleSubmit}>
          <ModalHeader toggle={this.handleCancel}>Save account changes</ModalHeader>
          <ModalBody>
            <p>Re-enter your password to make changes to your account.</p>
            <FormGroup>
              <Input
                name="password"
                onChange={this.handleChange}
                placeholder="Password"
                type="password"
                value={password}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Status status={status} />
            <Button onClick={this.handleCancel} type="button">
              Cancel
            </Button>
            <ButtonPrimary>Save changes</ButtonPrimary>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }

  handleChange = (e: Object) => this.setState({ [e.target.name]: e.target.value });

  handleCancel = () => {
    const { hideModal } = this.props;
    this.setState({ password: "" });
    hideModal();
  };

  handleSubmit = async (e: Object) => {
    e.preventDefault();
    const { onSuccess, reauthenticate } = this.props;
    const { password } = this.state;

    await reauthenticate(password);
    onSuccess();
  };
}

export default connect(
  state => ({
    selectedModal: selectors.getSelectedModal(state),
    status: selectors.getReauthenticateStatus(state),
  }),
  {
    hideModal: actions.hideModal,
    reauthenticate: actions.reauthenticate,
  },
)(ReauthenticateModalContainer);
