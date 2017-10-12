/* @flow */
import RSButton from "reactstrap/lib/Button";
import RSCard from "reactstrap/lib/Card";
import RSInput from "reactstrap/lib/Input";
import RSLabel from "reactstrap/lib/Label";
import RSNavbar from "reactstrap/lib/Navbar";
import styled, { css } from "styled-components";

import { COLORS } from "../constants";

/**
 * re-exports (for bundle size)
 */
export { default as CardBlock } from "reactstrap/lib/CardBlock";
export { default as Col } from "reactstrap/lib/Col";
export { default as Container } from "reactstrap/lib/Container";
export { default as Form } from "reactstrap/lib/Form";
export { default as FormGroup } from "reactstrap/lib/FormGroup";
export { default as Modal } from "reactstrap/lib/Modal";
export { default as ModalBody } from "reactstrap/lib/ModalBody";
export { default as ModalHeader } from "reactstrap/lib/ModalHeader";
export { default as ModalFooter } from "reactstrap/lib/ModalFooter";
export { default as Row } from "reactstrap/lib/Row";
export { RSLabel as Label };

/**
 * Utilities
 */
export const base = css`
  ${props => props.bold && "font-weight: bold;"} ${props =>
      props.fs && "font-size: " + props.fs + "px;"} ${props =>
      props.fw && "font-weight: " + props.fw + ";"} ${props =>
      props.ml && "margin-left: " + props.ml + "px;"} ${props =>
      props.mr && "margin-right: " + props.mr + "px;"} ${props =>
      props.mt && "margin-top: " + props.mt + "px;"} ${props =>
      props.mb && "margin-bottom: " + props.mb + "px;"} ${props =>
      props.mx &&
      css`
        margin-left: ${props.mx}px;
        margin-right: ${props.mx}px;
      `} ${props => props.pl && "padding-left: " + props.pl + "px;"} ${props =>
      props.pr && "padding-right: " + props.pr + "px;"} ${props =>
      props.pt && "padding-top: " + props.pt + "px;"} ${props =>
      props.pb && "padding-bottom: " + props.pb + "px;"} ${props =>
      props.w && "width: " + props.w + "px;"} ${props => props.zi && "z-index: " + props.zi + ";"};
`;

/**
 * Components
 */
export const A = styled.a`
  ${base} color: ${COLORS.primary} !important;
  cursor: pointer;
`;

export const AuthLabel = styled(RSLabel)`
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const Button = styled(RSButton)`
  border-radius: 0 !important;
`;

export const ButtonPrimary = styled(RSButton)`
  background-color: ${COLORS.primary} !important;
  border-color: ${COLORS.primary} !important;
  border-radius: 0;
  color: white;
  height: 38px;
  ${props => props.width && "width: " + props.width + "px;"} &:hover {
    background-color: #e6e6e6 !important;
    border-color: #adadad !important;
  }
`;

export const Card = styled(RSCard)`
  border-radius: 0;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

export const Div = styled.div`
  ${base};
`;

export const FlexCol = styled.div`
  ${base} display: flex;
  flex-direction: column;
  ${props => props.center && "align-items: center;"};
`;

export const FlexRow = styled.div`
  ${base} display: flex;
  flex-direction: row;
  ${props => props.around && "justify-content: space-around;"} ${props =>
      props.between && "justify-content: space-between;"} ${props =>
      props.center && "justify-content: center;"} ${props =>
      props.right && "justify-content: flex-end;"} ${props =>
      props.vbaseline && "align-items: baseline;"} ${props =>
      props.vbottom && "align-items: flex-end;"} ${props =>
      props.vcenter && "align-items: center;"} ${props =>
      props.vtop && "align-items: flex-start;"} ${props => props.wrap && "flex-wrap: wrap;"};
`;

export const H3 = styled.h3`
  margin-bottom: 20px;
`;

export const H4 = styled.h4`
  margin-bottom: 15px;
`;

export const Input = styled(RSInput)`
  border-radius: 0;
  &:focus {
    border-color: ${COLORS.primaryLight};
  }
`;

export const Navbar = styled(RSNavbar)`
  background-color: ${COLORS.dark};
  margin-bottom: 15px;
`;

export const Span = styled.span`
  ${base};
`;

export const TaskLabel = styled(RSLabel)`
  display: block;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 2px;
`;
