/* @flow */
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import * as actions from "../actions";
import * as selectors from "../reducers";
import type { ApiStatus, Auth } from "../types";
import Status from "./Status";
import {
  ButtonPrimary,
  Col,
  FlexRow,
  Form,
  FormGroup as CommonFormGroup,
  Input as CommonInput,
  Row,
  TaskLabel,
} from "./common";

type Props = {|
  auth: Auth,
  createStatus: ApiStatus,
  createTask: Function,
  signInStatus: ApiStatus,
  token: string | null,
|};

class TaskAddContainer extends React.Component {
  props: Props;
  textInput: HTMLElement;

  state = {
    isValid: true,
    tagsString: "",
    text: "",
  };

  render() {
    const { auth, createStatus, signInStatus } = this.props;
    const { isValid, tagsString, text } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col sm={9}>
            <FormGroup color={isValid ? null : "danger"}>
              <Input
                autoFocus
                getRef={c => (this.textInput = c)}
                onChange={e => this.setState({ text: e.target.value })}
                onFocus={() => this.setState({ isValid: true })}
                type="textarea"
                value={text}
              />
            </FormGroup>
          </Col>
          <Col sm={3} xs={12}>
            <FormGroup>
              <TaskLabel>
                tags <Optional>(optional)</Optional>
              </TaskLabel>
              <Input
                name="tagsString"
                onChange={this.handleTextChange}
                type="text"
                value={tagsString}
              />
            </FormGroup>
          </Col>
        </Row>
        <FlexRow>
          <ButtonPrimary disabled={signInStatus.loading || createStatus.loading}>
            Add task
          </ButtonPrimary>
          <div>
            {!auth.uid && (
              <Status
                status={signInStatus}
                messages={{ loading: "Creating temporary account...", success: "Account created" }}
              />
            )}
            <Status
              status={createStatus}
              messages={{ loading: "Saving...", success: "Task added" }}
            />
          </div>
        </FlexRow>
      </Form>
    );
  }

  handleTextChange = (e: Object) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e: Object) => {
    e.preventDefault();

    const { auth, createTask } = this.props;
    const { tagsString, text } = this.state;
    const tags = tagsString.trim() ? tagsString.trim().split(" ") : [];

    if (validate(text)) {
      await createTask(text, tags, auth);
      this.setState({ tagsString: "", text: "" });
      this.textInput.focus();
    } else {
      this.setState({ isValid: false });
    }
  };
}

function validate(text) {
  return !!text;
}

const Input = styled(CommonInput)`
  margin-bottom: 10px;
`;
const FormGroup = styled(CommonFormGroup)`
  margin-bottom: 0;
`;
const Optional = styled.span`
  color: #999;
  font-weight: normal;
  font-style: italic;
`;

export default connect(
  state => ({
    auth: selectors.getAuth(state),
    createStatus: selectors.getCreateTaskStatus(state),
    signInStatus: selectors.getSignInAnonymouslyStatus(state),
    token: selectors.getToken(state),
  }),
  {
    createTask: actions.createTask,
  },
)(TaskAddContainer);
