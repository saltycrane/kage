/* @flow */
import * as React from "react";
import styled from "styled-components";

import { COLORS } from "../constants";
import { Button as CommonButton } from "./common";

type Props = {
  onChange: (selected: string) => any,
  options: Array<[string, string]>,
  selected: string,
};

export default class RadioButtons extends React.Component<Props> {
  render() {
    const { onChange, options, selected } = this.props;

    return (
      <div>
        {options.map(([value, label]) => (
          <Button
            key={value}
            onClick={() => onChange(value)}
            size="sm"
            style={selected === value ? { border: `2px solid ${COLORS.primary}`, zIndex: 1 } : {}}
          >
            {label}
          </Button>
        ))}
      </div>
    );
  }
}

const Button = styled(CommonButton)`
  margin-left: -1px;
  margin-bottom: 10px;
  position: relative;
`;
