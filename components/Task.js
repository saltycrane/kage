/* @flow */
import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { COLORS } from "../constants";
import { formatDate } from "../lib/util";
import type { Task as TaskType } from "../types";
import Checkbox from "./Checkbox";
import { A as ACommon, Card, CardBlock as CommonCardBlock, FlexRow, Span } from "./common";
import { PencilIcon, XIcon } from "./icons";

type Props = {|
  onBump: Function,
  onDelete: Function,
  onEdit: Function,
  onToggle: Function,
  show: boolean,
  task: TaskType,
|};

const Task = ({ onBump, onDelete, onEdit, onToggle, show, task }: Props) => {
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
              Created: {formatDate(task.createdAt)}
              {task.completedAt &&
                <Span ml={20}>
                  Completed: {formatDate(task.completedAt)}
                </Span>}
            </Metadata>
            <div>
              <ToBeIcon onClick={onBump} title="bump the updated timestamp for sorting purposes">
                Bump
              </ToBeIcon>
              <IconWrapper title="edit (or double-click task)">
                <PencilIcon onClick={onEdit} />
              </IconWrapper>
              <IconWrapper title="delete"><XIcon onClick={onDelete} /></IconWrapper>
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
const CardBlock = styled(CommonCardBlock)`
  padding: 12px 5px 15px 20px;
`;
const IconWrapper = styled.span`
  margin-right: 15px;
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
const TaskCard = styled(Card)`
  background-color: ${props => (props.theme.isDeleted ? "rgba(255, 0, 0, 0.04)" : "white")};
  border-color: ${props => (props.theme.isDeleted ? "rgba(255, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.121569)")};
  margin-bottom: 15px;
`;
const Text = styled.span`
  color: ${props => (props.theme.isDeleted ? "rgba(255, 0, 0, 0.8)" : "#292b2c")};
  font-weight: 200;
  overflow-wrap: break-word;
  white-space: pre-line;
`;
const ToBeIcon = styled.span`
  color: ${props => (props.theme.isDeleted ? "rgba(255, 0, 0, 0.8)" : COLORS.primary)};
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  margin-right: 20px;
  vertical-align: 2px;
`;

export default Task;
