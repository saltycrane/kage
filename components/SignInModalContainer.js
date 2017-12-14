/* @flow */
import * as React from "react";
import { connect } from "react-redux";

import * as actions from "../actions";
import * as selectors from "../reducers";
import type { ApiStatus, SelectedModal } from "../types";
import Link from "./Link";
import SignInWithProviderContainer from "./SignInWithProviderContainer";
import Status from "./Status";
import {
  A,
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
  hideModal: () => any,
  selectedModal: SelectedModal,
  signIn: (email: string, password: string) => any,
  status: ApiStatus,
|};

class SignInContainer extends React.Component<Props, $FlowFixMeState> {
  email: HTMLElement;

  state = {
    email: "",
    password: "",
  };

  componentDidUpdate(prevProps) {
    if (this.props.selectedModal === "signin" && prevProps.selectedModal !== "signin") {
      this.email.focus();
    }
  }

  render() {
    const { hideModal, selectedModal, status } = this.props;
    const { email, password } = this.state;

    return (
      <Modal isOpen={selectedModal === "signin"} toggle={hideModal}>
        <ModalHeader toggle={hideModal}>Sign In</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSignIn}>
            <FormGroup>
              <AuthLabel>Email</AuthLabel>
              <Input
                name="email"
                onChange={this.handleChange}
                getRef={c => (this.email = c)}
                type="email"
                value={email}
              />
            </FormGroup>
            <FormGroup>
              <AuthLabel>Password</AuthLabel>
              <Input
                name="password"
                onChange={this.handleChange}
                type="password"
                value={password}
              />
            </FormGroup>
            <p>
              <Link href="/password-reset">
                <A>Forgot password?</A>
              </Link>
            </p>
            <FlexRow>
              <ButtonPrimary disabled={status.loading} color="primary">
                Sign in
              </ButtonPrimary>
              <Status
                status={status}
                messages={{ loading: "Signing in...", success: "Signed in" }}
              />
            </FlexRow>
            <SignInWithProviderContainer />
          </Form>
        </ModalBody>
      </Modal>
    );
  }

  handleChange = (e: Object) => this.setState({ [e.target.name]: e.target.value });

  handleSignIn = async (event: Object) => {
    event.preventDefault();

    const { signIn } = this.props;
    const { email, password } = this.state;

    const resp = await signIn(email, password);
    resp && this.setState({ email: "", password: "" });
  };
}

export default connect(
  state => ({
    selectedModal: selectors.getSelectedModal(state),
    status: selectors.getSignInStatus(state),
  }),
  {
    hideModal: actions.hideModal,
    signIn: actions.signIn,
  },
)(SignInContainer);
