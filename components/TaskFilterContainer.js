/* @flow */
import Router from "next/router";
import queryString from "query-string";
import React from "react";
import { connect } from "react-redux";

import * as selectors from "../reducers";
import Link from "./Link";
import RadioButtons from "./RadioButtons";
import { A, Div, FlexRow, Span, TaskLabel } from "./common";

type Props = {|
  query: {
    status: string,
    tag: string,
  },
  tags: Array<string>,
  totalCount: number,
|};

const TaskFilterContainer = ({ query, query: { status, tag }, tags, totalCount }: Props) => {
  if (totalCount === 0) {
    return null;
  }
  return (
    <div>
      <hr />
      <FlexRow center vbottom wrap mb={10}>
        <Div mx={10} pb={5}>
          <TaskLabel>status</TaskLabel>
          <RadioButtons
            onChange={handleFilterChange(query, "status")}
            options={["all", "active", "completed"].map(x => [x, x])}
            selected={status}
          />
        </Div>
        <Div mx={10} pb={5}>
          <TaskLabel>tag</TaskLabel>
          <RadioButtons
            onChange={handleFilterChange(query, "tag")}
            options={["all", ...tags].map(x => [x, x])}
            selected={tag}
          />
        </Div>
        <Div mx={10} pb={20}>
          <Link href="/"><A><Span bold fs={12}>reset all</Span></A></Link>
        </Div>
      </FlexRow>
    </div>
  );
};

function handleFilterChange(existingQuery, filterName) {
  return filterValue => {
    const newQuery = {
      ...existingQuery,
      [filterName]: filterValue,
    };
    Router.push("/?" + queryString.stringify(newQuery));
  };
}

export default connect(state => ({
  tags: selectors.getTags(state),
  totalCount: selectors.getTotalCount(state),
}))(TaskFilterContainer);
