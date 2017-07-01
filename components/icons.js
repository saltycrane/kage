/* @flow */
import React from "react";

import { COLORS } from "../constants";

type Props = {
  fill?: string,
  height?: number,
  onClick?: Function,
  stroke?: string,
  style?: Object,
  width?: number,
};

export const BoxIcon = ({ onClick, stroke = COLORS.primary, style = {} }: Props) =>
  <svg
    width="14"
    height="14"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={{ cursor: "pointer", ...style }}
  >
    <line x1="0" y1="0" x2="0" y2="14" stroke={stroke} strokeWidth="1.5" />
    <line x1="0" y1="14" x2="14" y2="14" stroke={stroke} strokeWidth="1.5" />
    <line x1="14" y1="14" x2="14" y2="0" stroke={stroke} strokeWidth="1.5" />
    <line x1="14" y1="0" x2="0" y2="0" stroke={stroke} strokeWidth="1.5" />
  </svg>;

export const CheckIcon = ({ onClick, stroke = "#ffffff", style = {} }: Props) =>
  <svg
    width="14"
    height="14"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={{ cursor: "pointer", ...style }}
  >
    <line x1="2" y1="9" x2="5" y2="12" stroke={stroke} strokeLinecap="round" strokeWidth="2" />
    <line x1="5" y1="12" x2="12" y2="5" stroke={stroke} strokeLinecap="round" strokeWidth="2" />
  </svg>;

export const CheckboxIcon = ({
  onClick,
  stroke = "#ffffff",
  fill = COLORS.primary,
  style = {},
}: Props) =>
  <svg
    width="14"
    height="14"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={{ cursor: "pointer", ...style }}
  >
    <rect x="0" y="0" width="14" height="14" stroke={stroke} fill={fill} />
    <line x1="2" y1="8" x2="5" y2="11" stroke={stroke} strokeLinecap="round" strokeWidth="2" />
    <line x1="5" y1="11" x2="12" y2="4" stroke={stroke} strokeLinecap="round" strokeWidth="2" />
  </svg>;

export const ChevronDownIcon = ({ onClick, stroke = COLORS.primary, style = {} }: Props) =>
  <svg
    width="14"
    height="14"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={{ cursor: "pointer", ...style }}
  >
    <line x1="1" y1="5" x2="7" y2="10" stroke={stroke} strokeLinecap="round" strokeWidth="1.5" />
    <line x1="7" y1="10" x2="13" y2="5" stroke={stroke} strokeLinecap="round" strokeWidth="1.5" />
  </svg>;

export const PencilIcon = ({ onClick, stroke = COLORS.primary, style = {} }: Props) =>
  <svg
    width="14"
    height="14"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={{ cursor: "pointer", ...style }}
  >
    <line x1="0" y1="14" x2="0" y2="10" stroke={stroke} strokeWidth="4" />
    <line x1="0" y1="14" x2="4" y2="14" stroke={stroke} strokeWidth="4" />
    <line x1="4" y1="14" x2="13" y2="5" stroke={stroke} strokeWidth="1" />
    <line x1="13" y1="5" x2="9" y2="1" stroke={stroke} strokeWidth="2" />
    <line x1="9" y1="1" x2="0" y2="10" stroke={stroke} strokeWidth="1" />
    <line x1="0" y1="10" x2="4" y2="14" stroke={stroke} strokeWidth="2" />
  </svg>;

export const SolidBoxIcon = ({
  onClick,
  stroke = COLORS.primary,
  fill = COLORS.primary,
  style = {},
}: Props) =>
  <svg
    width="14"
    height="14"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={{ cursor: "pointer", ...style }}
  >
    <rect x="0" y="0" width="14" height="14" stroke={stroke} fill={fill} />
  </svg>;

export const XIcon = ({ onClick, stroke = COLORS.primary }: Props) =>
  <svg
    width="12"
    height="12"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <line x1="1" x2="11" y1="1" y2="11" stroke={stroke} strokeLinecap="round" strokeWidth="1.8" />
    <line x1="1" x2="11" y1="11" y2="1" stroke={stroke} strokeLinecap="round" strokeWidth="1.8" />
  </svg>;

export const XIcon2 = ({ onClick, stroke = "white" }: Props) =>
  <svg
    width="10"
    height="10"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <line x1="1" x2="9" y1="1" y2="9" stroke={stroke} strokeLinecap="round" strokeWidth="2" />
    <line x1="1" x2="9" y1="9" y2="1" stroke={stroke} strokeLinecap="round" strokeWidth="2" />
  </svg>;
