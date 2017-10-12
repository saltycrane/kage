/* @flow */
import React from "react";
import styled from "styled-components";

import { Input as CommonInput } from "./common";
import { ChevronDownIcon } from "./icons";

const SelectInput = (props: Object) => (
  <Container>
    <IconWrapper>
      <ChevronDownIcon />
    </IconWrapper>
    <Input size="sm" type="select" {...props} />
  </Container>
);

const Container = styled.div`
  position: relative;
`;
const IconWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  right: 7px;
  top: 3px;
`;
const Input = styled(CommonInput)`
  -webkit-appearance: none;
  padding-right: 26px;
`;

export default SelectInput;
