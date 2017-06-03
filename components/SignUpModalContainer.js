/* @flow */
import React from "react";
import { connect } from "react-redux";

import * as actions from "../actions";
import * as selectors from "../reducers";
import type { ApiStatus, Auth, CurrentUser, SelectedModal } from "../types";
import SignInWithProviderContainer from "./SignInWithProviderContainer";
import Status from "./Status";
import {
  AuthLabel,
  ButtonPrimary,
  FlexRow,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
} from "./common";

type Props = {|
  createUser: Function,
  currentUser: CurrentUser,
  hideModal: () => Object,
  linkAnonymousUser: Function,
  retrieveTasks: (auth: Auth) => any,
  selectedModal: SelectedModal,
  signUp: Function,
  status: ApiStatus,
  storeAuth: (firebaseUser: any) => Object,
|};

class SignInUpModalContainer extends React.Component {
  props: Props;
  email: HTMLElement;

  state = {
    email: "",
    password: "",
    username: "",
  };

  componentDidUpdate(prevProps) {
    if (this.props.selectedModal === "signup" && prevProps.selectedModal !== "signup") {
      this.email.focus();
    }
  }

  render() {
    const { hideModal, selectedModal, status } = this.props;
    const { email, password, username } = this.state;

    return (
      <Modal isOpen={selectedModal === "signup"} toggle={hideModal}>
        <ModalHeader toggle={hideModal}>Sign Up</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <AuthLabel>Email</AuthLabel>
              <Input
                name="email"
                getRef={c => (this.email = c)}
                onChange={this.handleChange}
                type="email"
                value={email}
              />
            </FormGroup>
            {false &&
              <FormGroup>
                <AuthLabel>Username</AuthLabel>
                <Input name="username" type="text" value={username} onChange={this.handleChange} />
              </FormGroup>}
            <FormGroup>
              <AuthLabel>Password</AuthLabel>
              <Input
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FlexRow>
              <ButtonPrimary disabled={status.loading}>Submit</ButtonPrimary>
              <Status
                status={status}
                messages={{ loading: "Signing up...", success: "Signed up" }}
              />
            </FlexRow>
            <SignInWithProviderContainer />
          </Form>
        </ModalBody>
      </Modal>
    );
  }

  handleChange = (e: Object) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e: Object) => {
    e.preventDefault();

    const {
      createUser,
      currentUser,
      linkAnonymousUser,
      retrieveTasks,
      signUp,
      storeAuth,
    } = this.props;
    const { email, password } = this.state;

    let newUser;
    if (currentUser) {
      newUser = await linkAnonymousUser(email, password);
      const auth = await storeAuth(newUser);
      retrieveTasks(auth);
    } else {
      newUser = await signUp(email, password);
    }
    if (newUser) {
      const usernameNotImplementedYet = `user${Date.now().toString()}`;
      createUser(newUser, usernameNotImplementedYet);
      this.setState({ email: "", password: "" });
    }
  };
}

export default connect(
  state => ({
    currentUser: selectors.getCurrentUser(state),
    selectedModal: selectors.getSelectedModal(state),
    status: selectors.getSignUpStatus(state),
  }),
  {
    createUser: actions.createUser,
    hideModal: actions.hideModal,
    linkAnonymousUser: actions.linkAnonymousUser,
    retrieveTasks: actions.retrieveTasks,
    signUp: actions.signUp,
    storeAuth: actions.storeAuth,
  },
)(SignInUpModalContainer);
