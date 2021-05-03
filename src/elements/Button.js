import React from "react";
import styled from "styled-components";

import Color from "elements/DesignSys";

const Button = (props) => {
  const { main, sub, _onClick, text, children } = props;
  const styles = { onClick: _onClick, text: text };

  return (
    <>
      {sub ? (
        <Btn color="white" contrast={Color.Primary} {...styles}>
          {text ? text : children}
        </Btn>
      ) : (
        <Btn color={Color.Primary} contrast="white" {...styles}>
          {text ? text : children}
        </Btn>
      )}
    </>
  );
};

Button.defaultProps = {
  children: "I'm Button!",
  _onClick: () => {},
};

const Btn = styled.button`
  background-color: ${(props) => props.color};
  border: 1px solid ${Color.Primary};
  border-radius: 16px;

  color: ${(props) => props.contrast};
  font-size: 20px;
  font-weight: 700;

  flex-grow: 1;
  height: 50px;
  margin: 1%;
  width: max-content;
  box-sizing: border-box;

  cursor: pointer;
  transition: border 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover {
    background: ${(props) => props.contrast};
    color: ${(props) => props.color};
    border: 1px solid ${Color.Primary};
    svg {
      color: white;
    }
  }
  svg {
    color: ${(props) => props.contrast};
  }
`;

export default Button;
