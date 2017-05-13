/* @flow */
/**
 * Copied from @chenglou's react-spinner, adapted for styled-components, and tweaked
 *
 * https://github.com/chenglou/react-spinner/blob/35931a7d9586a42cacb293100669552a452362b3/index.jsx
 * https://github.com/chenglou/react-spinner/blob/35931a7d9586a42cacb293100669552a452362b3/react-spinner.css
 * https://github.com/styled-components/styled-components/blob/18fe1543c2aeb88ee62c22229e22e06e91aa1091/README.md#animations
 */
import React from "react";
import styled, { keyframes } from "styled-components";

const Spinner = () => <Container>{getBars()}</Container>;

function getBars() {
  let bars = [];
  for (let i = 0; i < 12; i++) {
    let barStyle = {};
    barStyle.WebkitAnimationDelay = barStyle.animationDelay = (i - 12) / 10 + "s";
    barStyle.WebkitTransform = barStyle.transform = "rotate(" + i * 30 + "deg) translate(111%)";
    bars.push(<Bar style={barStyle} key={i} />);
  }
  return bars;
}

const spin = keyframes`
  0% { opacity: .9; }
  100% { opacity: 0; }
`;

const Container = styled.div`
  position: relative;
  width: 21px;
  height: 21px;
  top: 50%;
  left: 50%;
`;

const Bar = styled.div`
  animation: ${spin} 1.2s linear infinite;
  border-radius: 5px;
  background-color: #fff;
  position: absolute;
  width: 30%;
  height: 6.1%;
  top: -3.7%;
  left: -30%;
`;

export default Spinner;
