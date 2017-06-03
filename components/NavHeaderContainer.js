/* @flow */
import Router from "next/router";
import React from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";

import * as actions from "../actions";
import * as selectors from "../reducers";
import type { CurrentUser, SelectedModal } from "../types";
import Link from "./Link";
import { Button, Container, FlexRow, Navbar } from "./common";

type Props = {|
  currentUser: CurrentUser,
  isIndex?: boolean,
  showModal: (selectedModal: SelectedModal) => Object,
  signOut: Function,
|};

const NavHeaderContainer = ({ currentUser, isIndex = false, showModal, signOut }: Props) => {
  let authLinks;
  if (currentUser && !currentUser.isAnonymous) {
    const { email, providerId, uid } = currentUser;
    authLinks = (
      <FlexRow vbaseline wrap>
        {providerId === "password"
          ? <Link href={`/users/edit?id=${uid}`}><UserEmailLink>{email}</UserEmailLink></Link>
          : <UserEmail>{email}</UserEmail>}
        <FakeA onClick={() => signOut() && Router.push("/")}>Sign Out</FakeA>
      </FlexRow>
    );
  } else {
    authLinks = (
      <FlexRow wrap>
        <FakeA onClick={() => showModal("signin") && Router.push("/")}>Sign in</FakeA>
        <FakeA onClick={() => showModal("signup") && Router.push("/")}>Sign up</FakeA>
      </FlexRow>
    );
  }

  return (
    <Navbar>
      <Container>
        <FlexRow between wrap>
          {isIndex
            ? <Link href="/about"><LogoLink outline>Kage</LogoLink></Link>
            : <Link href="/"><LogoLink outline>Kage</LogoLink></Link>}
          {authLinks}
        </FlexRow>
      </Container>
    </Navbar>
  );
};

export default connect(
  state => ({
    currentUser: selectors.getCurrentUser(state),
  }),
  {
    showModal: actions.showModal,
    signOut: actions.signOut,
  },
)(NavHeaderContainer);

const aCss = css`
  color: #fff !important;
  cursor: pointer;
  font-weight: 100;
  margin-left: 20px;
  text-decoration: none !important;
  white-space: nowrap;
  &:hover {
    color: #ddd !important;
  }
`;
const FakeA = styled.span`${aCss}`;
const LogoLink = styled(Button)`
  color: #fff !important;
  font-size: 14px;
  font-variant-caps: small-caps;
  margin-right: 20px;
  padding: 2px 6px 2px 20px !important;
`;
const UserEmail = styled.span`
  color: #fff;
  font-size: 12px;
  font-weight: 800;
`;
const UserEmailLink = styled.a`
  ${aCss}
  font-size: 12px;
  font-weight: 800;
`;
