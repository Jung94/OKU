import React from "react";
import styled from "styled-components";

import { Color } from "shared/DesignSys";

const Line = (props) => {
  const { top, bottom, right, margin, height, color } = props;
  return <Divider {...props} />;
};

Line.defaultProps = {
  color: Color.Light_3,
};

const Divider = styled.div`
  ${(props) => (props.top ? `border-top: 0.5px solid ${props.color};` : "")}
  ${(props) => (props.bottom ? `border-bottom: 0.5px solid ${props.color};` : "")}
  ${(props) => (props.right ? `border-right: 0.5px solid ${props.color};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  width: 100%;
  ${(props) => (props.height ? `height: ${props.height};` : "height: 1px;")}

  z-index: 3;
`;

export default Line;
