/* @flow */
import React from "react";
import { connect } from "react-redux";
import * as selectors from "../reducers";
import styled from "styled-components";

type Props = {
  count: number,
  totalCount: number,
};

const TaskCountContainer = ({ count, totalCount }: Props) => {
  let text = (
    <span>
      showing <b>{count}</b> of <b>{totalCount}</b> items
    </span>
  );
  if (totalCount === 0) {
    text = null;
  } else if (totalCount === 1 && count === 1) {
    text = (
      <span>
        showing the <b>1</b> and only item
      </span>
    );
  } else if (count === totalCount) {
    text = (
      <span>
        showing all <b>{count}</b> items
      </span>
    );
  }
  return (
    <Container>
      {text}
    </Container>
  );
};

const Container = styled.div`
  font-size: 12px;
  text-align: center;
`;

export default connect((state, ownProps) => ({
  count: selectors.getFilteredTasks(state, ownProps).length,
  totalCount: selectors.getTotalCount(state),
}))(TaskCountContainer);
