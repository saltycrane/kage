/* @flow */
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import * as actions from "../actions";
import { Button as CommonButton, FlexRow } from "./common";

type Props = {|
  signInWithGithub: () => any,
  signInWithGoogle: () => any,
  signInWithTwitter: () => any,
|};

const SignInWithProviderContainer = ({
  signInWithGithub,
  signInWithGoogle,
  signInWithTwitter,
}: Props) =>
  <div>
    <Separator>
      <Or>or</Or>
    </Separator>
    <FlexRow center>
      <div>
        <Button onClick={signInWithGithub}>
          <Icon alt="" height="18" width="18" src="/static/github-icon.svg" />
          Sign in with Github
        </Button>
        <Button onClick={signInWithGoogle}>
          <Icon alt="" height="18" width="18" src="/static/google-icon.svg" />
          Sign in with Google
        </Button>
      </div>
    </FlexRow>
  </div>;

const Button = styled(CommonButton)`
  margin: 15px 15px 5px 0;
  padding-bottom: 7px;
  padding-top: 9px;
`;
const Icon = styled.img`margin: -3px 14px 0 -4px;`;
const Or = styled.span`
  background-color: white;
  padding: 0 10px;
  position: absolute;
  left: calc(50% - 20px);
  top: -13px;
`;
const Separator = styled.div`
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  margin-top: 20px;
  position: relative;
`;

export default connect(state => ({}), {
  signInWithGithub: actions.signInWithGithub,
  signInWithGoogle: actions.signInWithGoogle,
  signInWithTwitter: actions.signInWithTwitter,
})(SignInWithProviderContainer);
