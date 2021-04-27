import React from "react";
import styled from "styled-components";

const Tag = (props) => {
  const { children, top, bottom, margin, color } = props;
  return <TagBlock {...props}>#&thinsp;{children}</TagBlock>;
};

Tag.defaultProps = {
  color: "#d2d2d2",
};

const TagBlock = styled.div`
  background: linear-gradient(45deg, #33313188 30%, #5a565688 90%);
  border: 1.8px solid #3331311a;
  color: whitesmoke;
  font-size: 0.75rem;
  font-weight: 500;
  width: fit-content;
  padding: 1% 2%;
  margin: 0.5%;
  border-radius: 10rem;
  user-select: none;
  cursor: pointer;
`;

export default Tag;
