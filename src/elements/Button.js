import React from "react";
import styled from "styled-components";

import { Text } from "elements/";
import { Color } from "shared/DesignSys";

const Button = (props) => {
  const { main, sub, _onClick, text, children, width, margin } = props;
  const styles = { onClick: _onClick, text: text, width: width, margin: margin };
  return (
    <>
      {sub ? (
        <Btn color="white" contrast={Color.Primary} {...styles}>
          {text ? text : children}
        </Btn>
      ) : main ? (
        <Btn color={Color.Primary} contrast="white" {...styles}>
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
  margin: false,
  width: "max-content",
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
  width: ${(props) => props.width};
  box-sizing: border-box;

  margin: ${(props) => props.margin};

  cursor: pointer;
  transition: color 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
    border 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover {
    background-color: ${(props) => props.contrast};
    color: ${(props) => props.color};
    border: 1px solid ${Color.Primary};
    box-shadow: 0 0 0 3px ${Color.Primary}33;
    svg {
      color: ${(props) => props.color};
    }
  }
  &:active {
    box-shadow: 0 0 0 3px ${Color.Primary}33;
  }
  svg {
    color: ${(props) => props.contrast};
  }
`;

export default Button;
