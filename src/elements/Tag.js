import React from "react";
import styled from "styled-components";

import { Color } from "shared/DesignSys";

const Tag = (props) => {
  const { children, top, bottom, margin, color } = props;
  return <TagBlock {...props}>#&thinsp;{children}</TagBlock>;
};

Tag.defaultProps = {};

const TagBlock = styled.div`
  background: ${Color.Tag};
  color: white;
  font-size: 14px;
  width: fit-content;
  padding: 0.75% 1% 0.75% 1.25%;
  margin: 0.5%;
  border-radius: 7px;
  user-select: none;
  cursor: pointer;
`;

export default Tag;
