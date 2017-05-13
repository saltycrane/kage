/* @flow */
import React from "react";

import Layout from "../components/Layout";
import SignInModalContainer from "../components/SignInModalContainer";
import SignUpModalContainer from "../components/SignUpModalContainer";
import TaskAddContainer from "../components/TaskAddContainer";
import TaskCountContainer from "../components/TaskCountContainer";
import TaskFilterContainer from "../components/TaskFilterContainer";
import TaskListContainer from "../components/TaskListContainer";
import TaskSorterContainer from "../components/TaskSorterContainer";
import { Div, FlexRow } from "../components/common";
import appEnhancer from "../lib/appEnhancer";

const DEFAULT_QUERY = {
  sortBy: "createdAt",
  status: "all",
  tag: "all",
};

class TaskListPage extends React.Component {
  render() {
    const query = { ...DEFAULT_QUERY, ...this.props.url.query };

    return (
      <Layout isIndex={true}>
        <SignInModalContainer />
        <SignUpModalContainer />
        <TaskAddContainer />
        <TaskFilterContainer query={query} />
        <FlexRow between vbottom mb={5}>
          <Div w={170} />
          <TaskCountContainer query={query} />
          <TaskSorterContainer query={query} />
        </FlexRow>
        <TaskListContainer query={query} />
      </Layout>
    );
  }
}

export default appEnhancer(TaskListPage);
