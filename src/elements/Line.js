import React from "react";
import styled from "styled-components";

const Line = (props) => {
  const { top, bottom, margin, color } = props;
  return <Divider {...props} />;
};

Line.defaultProps = {
  color: "#d2d2d2",
};

const Divider = styled.div`
  ${(props) => (props.top ? `border-top: 0.5px solid ${props.color};` : "")}
  ${(props) =>
    props.bottom ? `border-bottom: 0.5px solid ${props.color};` : ""}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  width: 100%;
  height: 1px;
  z-index: 3;
`;

export default Line;
