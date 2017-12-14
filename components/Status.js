/* @flow */
import * as React from "react";
import styled from "styled-components";

import Spinner from "./Spinner";
import { CheckIcon, XIcon2 } from "./icons";
import type { ApiStatus } from "../types";

const SHOW_SUCCESS_DURATION_MS = 2000;
const FADE_OUT_DURATION_MS = 500;

type Props = {|
  minWidth?: string,
  onHide?: () => any,
  status: ApiStatus,
  style?: Object,
  messages?: {|
    error?: string,
    loading: string,
    success: string,
  |},
|};

export default class Status extends React.Component<Props, $FlowFixMeState> {
  timeout: number;

  state = {
    success: false,
  };

  componentWillReceiveProps(nextProps: Props) {
    const { onHide, status } = this.props;

    if (nextProps.status.success !== status.success) {
      this.setState({ success: nextProps.status.success });
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.setState({ success: false });
        if (onHide) {
          setTimeout(() => {
            onHide();
          }, FADE_OUT_DURATION_MS);
        }
      }, SHOW_SUCCESS_DURATION_MS);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { messages = {}, status, style, minWidth = "0" } = this.props;
    const { success } = this.state;

    return (
      <Container style={style}>
        <StatusItem color="gray" show={status.loading} minWidth={minWidth}>
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
          {messages.loading || "Loading"}
        </StatusItem>
        <StatusItem color="red" show={status.error} minWidth={minWidth}>
          <Icon>
            <XIcon2 />
          </Icon>
          {messages.error || `Error: ${status.error || ""}`}
        </StatusItem>
        <StatusItem color="green" show={success} minWidth={minWidth}>
          <Icon>
            <CheckIcon />
          </Icon>
          {messages.success || "Success"}
        </StatusItem>
      </Container>
    );
  }
}

const Container = styled.div`
  height: 22px;
  margin-left: 12px;
  margin-top: 5px;
  position: relative;
  width: 250px;
`;
const Icon = styled.div`
  margin-right: 5px;
  padding-top: 1px;
`;
const StatusItem = styled.div`
  align-items: center;
  background-color: ${props => props.color};
  border-radius: 0;
  box-shadow: 5px 0 10px white, -5px 0 10px white;
  color: white;
  display: flex;
  font-size: 12px;
  justify-content: flex-start;
  left: 0;
  min-height: 24px;
  min-width: ${props => props.minWidth};
  padding: 2px 8px 2px 5px;
  position: absolute;
  opacity: ${props => (props.show ? 1.0 : 0.0)};
  transition: opacity ${FADE_OUT_DURATION_MS}ms;
`;
const SpinnerWrapper = styled.div`
  height: 22px;
  width: 22px;
`;
