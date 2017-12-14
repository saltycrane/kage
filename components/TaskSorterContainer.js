/* @flow */
import Router from "next/router";
import queryString from "query-string";
import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import * as selectors from "../reducers";
import SelectInput from "./SelectInput";
import { FlexRow, TaskLabel } from "./common";

type Props = {|
  count: number,
  query: {
    sort: string,
  },
|};

const TaskSorterContainer = ({ count, query, query: { sort } }: Props) => {
  if (count < 2) {
    return <Spacer />;
  }
  return (
    <Container>
      <FlexRow right>
        <TaskLabel>sort by</TaskLabel>
      </FlexRow>
      <SelectInput onChange={e => handleSortChange(e, query)} value={sort}>
        <option value="createdAt:asc">created (ascending)</option>
        <option value="createdAt:desc">created (descending)</option>
        <option value="completedAt:asc">completed (ascending)</option>
        <option value="completedAt:desc">completed (descending)</option>
        <option value="updatedAt:asc">updated (ascending)</option>
        <option value="updatedAt:desc">updated (descending)</option>
      </SelectInput>
    </Container>
  );
};

function handleSortChange(event, existingQuery) {
  const newQuery = {
    ...existingQuery,
    sort: event.target.value,
  };
  Router.push("/?" + queryString.stringify(newQuery));
}

const Container = styled.div`
  margin-bottom: 4px;
`;
const Spacer = styled.div`
  height: 40px;
  width: 100px;
`;

export default connect((state, ownProps) => ({
  count: selectors.getFilteredTasks(state, ownProps).length,
}))(TaskSorterContainer);
