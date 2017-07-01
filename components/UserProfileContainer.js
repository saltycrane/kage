/* @flow */
import React from "react";
import { connect } from "react-redux";

import * as selectors from "../reducers";
import type { User } from "../types";
import { FormGroup, H3, Input, Label } from "./common";

type Props = {|
  user: User,
|};

const UserProfileContainer = ({ user }: Props) =>
  <div>
    <H3>User Profile</H3>
    {false &&
      <FormGroup>
        <Label>Username</Label>
        <Input disabled name="username" value={user.username} />
      </FormGroup>}
  </div>;

export default connect(
  (state, ownProps) => ({
    user: selectors.getUser(state, ownProps.id),
  }),
  {},
)(UserProfileContainer);
