/* @flow */
import Router from "next/router";
import queryString from "query-string";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import * as selectors from "../reducers";
import RadioButtons from "./RadioButtons";
import { FlexRow, TaskLabel } from "./common";

type Props = {|
  count: number,
  query: {
    sortBy: string,
  },
|};

const TaskSorterContainer = ({ count, query, query: { sortBy } }: Props) => {
  if (count < 2) {
    return <Spacer />;
  }
  return (
    <Container>
      <FlexRow right>
        <TaskLabel>sort by</TaskLabel>
      </FlexRow>
      <RadioButtons
        onChange={handleSortChange(query, "sortBy")}
        options={[["createdAt", "created"], ["completedAt", "completed"]]}
        selected={sortBy}
      />
    </Container>
  );
};

function handleSortChange(existingQuery, name) {
  return sortValue => {
    const newQuery = {
      ...existingQuery,
      [name]: sortValue,
    };
    Router.push("/?" + queryString.stringify(newQuery));
  };
}

const Container = styled.div`
  margin-bottom: 4px;
`;
const Spacer = styled.div`
  height: 40px;
  width: 100px;
`;

export default connect((state, ownProps) => ({
  count: selectors.getFilteredTasks(state)(ownProps.query).length,
}))(TaskSorterContainer);
