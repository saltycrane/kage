/* @flow */
import React from "react";
import styled from "styled-components";

import { formatInputDate, getTimestamp } from "../lib/util";
import type { ApiStatus, Task } from "../types";
import Checkbox from "./Checkbox";
import {
  Button,
  ButtonPrimary,
  CardBlock as CommonCardBlock,
  Card,
  Col,
  FlexRow,
  Form,
  FormGroup,
  Input,
  Span,
  TaskLabel,
} from "./common";

type Props = {|
  onCancel: Function,
  onDelete: Function,
  onSubmit: Function,
  show: boolean,
  status: ApiStatus,
  task: Task,
|};

export default class TaskEdit extends React.Component {
  props: Props;

  state = {};

  componentWillReceiveProps(nextProps: Props) {
    if (!this.props.show && nextProps.show) {
      const { task: { tags } } = nextProps;
      this.setState({
        completed: !!nextProps.task.completed,
        completedAt: nextProps.task.completedAt || null,
        tagsString: tags ? tags.join(" ") : "",
        text: nextProps.task.text,
      });
    }
  }

  render() {
    const { onCancel, onDelete, show, status } = this.props;
    const { completed, completedAt, tagsString, text } = this.state;

    if (!show) {
      return null;
    }

    return (
      <TaskEditCard>
        <CardBlock>
          <Title>EDITING</Title>
          <Form onSubmit={this.handleSubmit}>
            <TextInput
              autoFocus
              name="text"
              type="textarea"
              value={text}
              onChange={this.handleTextChange}
            />
            <FormGroup row>
              <Col md={6}>
                <TaskLabel>completed on</TaskLabel>
                <Checkbox
                  checked={completed}
                  onClick={this.handleCheckboxClick}
                  style={{ top: 5 }}
                  tabIndex="0"
                />
                <DateInput
                  onChange={this.handleDateChange}
                  tabIndex="-1"
                  type="date"
                  value={completedAt ? formatInputDate(completedAt) : ""}
                />
              </Col>
              <Col md={6}>
                <TaskLabel>tags</TaskLabel>
                <Input
                  name="tagsString"
                  onChange={this.handleTextChange}
                  type="text"
                  value={tagsString}
                />
              </Col>
            </FormGroup>
            <FlexRow between>
              <Button
                children="Delete"
                color="danger"
                onClick={onDelete}
                tabIndex="-1"
                type="button"
              />
              <span>
                <Button children="Cancel" onClick={onCancel} type="button" />
                <Span mr={10} />
                <ButtonPrimary children="Save" disabled={status.loading} />
              </span>
            </FlexRow>
          </Form>
        </CardBlock>
      </TaskEditCard>
    );
  }

  handleTextChange = (e: Object) => this.setState({ [e.target.name]: e.target.value });

  handleCheckboxClick = () => {
    let { completed, completedAt } = this.state;
    completedAt = completedAt || Date.now();

    this.setState({
      completed: !completed,
      completedAt: !completed ? completedAt : null,
    });
  };

  handleDateChange = (e: Object) => {
    const completedAt = getTimestamp(e.target.value);
    this.setState({
      completed: !!completedAt,
      completedAt,
    });
  };

  handleSubmit = (e: Object) => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { completed, completedAt, tagsString, text } = this.state;
    const tags = tagsString.trim() ? tagsString.trim().split(" ") : [];

    const update = {
      completed,
      completedAt: completedAt || null,
      tags,
      text,
    };

    onSubmit(update);
  };
}

const TaskEditCard = styled(Card)`
  margin-bottom: 10px;
  z-index: 2;
`;
const CardBlock = styled(CommonCardBlock)`
  padding-top: 10px;
`;
const DateInput = styled(Input)`
  height: 38px;
  margin-left: 30px;
  width: calc(100% - 30px);
`;
const TextInput = styled(Input)`
  margin-bottom: 10px;
`;
const Title = styled.p`font-weight: 600;`;
