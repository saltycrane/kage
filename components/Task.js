/* @flow */
import format from "date-fns/format";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { PencilIcon, XIcon } from "./icons";
import { DATETIME_FORMAT } from "../constants";
import type { Task as TaskType } from "../types";
import Checkbox from "./Checkbox";
import { A as ACommon, Card, CardBlock as CommonCardBlock, FlexRow, Span } from "./common";

type Props = {|
  onDelete: Function,
  onEdit: Function,
  onToggle: Function,
  show: boolean,
  task: TaskType,
|};

const Task = ({ onDelete, onEdit, onToggle, show, task }: Props) => {
  if (!show) {
    return null;
  }

  return (
    <ThemeProvider theme={{ isDeleted: task.isDeleted }}>
      <TaskCard
        onDoubleClick={e => {
          e.preventDefault();
          onEdit();
        }}
      >
        <CardBlock>
          <FlexRow between vtop>
            <Metadata>
              Created: {format(task.createdAt, DATETIME_FORMAT)}
              {task.completedAt &&
                <Span ml={20}>
                  Completed: {format(task.completedAt, DATETIME_FORMAT)}
                </Span>}
            </Metadata>
            <div>
              <PencilIcon onClick={onEdit} style={{ marginRight: 10 }} />
              <XIcon onClick={onDelete} />
            </div>
          </FlexRow>
          <Checkbox
            checked={task.completed}
            color={task.isDeleted ? "red" : undefined}
            onClick={onToggle}
          >
            {task.tags && <Tags>{task.tags.join(" ")} - </Tags>}
            <Text>{linkify(task.text)}</Text>
          </Checkbox>
        </CardBlock>
      </TaskCard>
    </ThemeProvider>
  );
};

function linkify(text) {
  const result = text.match(/(.*)(https?:\/\/\S*)( |$)(.*)/);
  if (!result) {
    return text;
  }
  const [, preText, url, space, postText] = result;
  return <span>{preText}<A href={url} target="_blank">{url}</A>{space}{postText}</span>;
}

const A = styled(ACommon)`
  ${props => props.theme.isDeleted && "color: rgba(255, 0, 0, 0.8) !important;"}
`;
const TaskCard = styled(Card)`
  background-color: ${props => (props.theme.isDeleted ? "rgba(255, 0, 0, 0.04)" : "white")};
  border-color: ${props => (props.theme.isDeleted ? "rgba(255, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.121569)")};
  margin-bottom: 15px;
`;
const CardBlock = styled(CommonCardBlock)`
  padding: 12px 20px 15px 20px;
`;
const Metadata = styled.div`
  color: ${props => (props.theme.isDeleted ? "rgba(255, 0, 0, 0.8)" : "#999")};
  font-size: 10px;
`;
const Tags = styled.span`
  color: ${props => (props.theme.isDeleted ? "rgba(255, 0, 0, 0.8)" : "#292b2c")};
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
`;
const Text = styled.span`
  color: ${props => (props.theme.isDeleted ? "rgba(255, 0, 0, 0.8)" : "#292b2c")};
  font-weight: 200;
`;

export default Task;
