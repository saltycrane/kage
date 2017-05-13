/* @flow */
import React from "react";

import { COLORS } from "../constants";
import { Button, ButtonGroup } from "./common";

type Props = {
  onChange: (selected: string) => any,
  options: Array<[string, string]>,
  selected: string,
};

export default class RadioButtons extends React.Component {
  props: Props;

  render() {
    const { onChange, options, selected } = this.props;

    return (
      <ButtonGroup size="sm">
        {options.map(([value, label]) => (
          <Button
            key={value}
            onClick={() => onChange(value)}
            style={
              selected === value
                ? { border: `2px solid ${COLORS.primary}`, boxShadow: "none", zIndex: 1 }
                : { boxShadow: "none" }
            }
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>
    );
  }
}
