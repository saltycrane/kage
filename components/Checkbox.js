/* @flow */
import * as React from "react";

import { BoxIcon, CheckboxIcon } from "./icons";

type Props = {|
  checked?: boolean,
  children?: any,
  color?: string,
  onClick: Function,
  style?: Object,
  tabIndex?: string,
|};

const Checkbox = ({ checked, children, color, onClick, style = {}, tabIndex }: Props) => (
  <div style={{ position: "relative", ...style }}>
    <div
      onClick={onClick}
      onKeyUp={e => e.keyCode === 32 && onClick(e)}
      style={{ position: "absolute", top: 1, left: 0 }}
      tabIndex={tabIndex}
    >
      {checked ? <CheckboxIcon fill={color} /> : <BoxIcon stroke={color} />}
    </div>
    <div style={{ marginLeft: 20 }}>{children}</div>
  </div>
);

export default Checkbox;
