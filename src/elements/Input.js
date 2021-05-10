import React, { useRef, useState } from "react";
import styled from "styled-components";

import { Color } from "shared/DesignSys";

const Input = (props) => {
  // adorment는 input 오른쪽에 "원"
  // plcholder는 placeholder
  const { output, width, margin, adornment, plcholder, num, children, value, _onChange } = props;
  const styles = { onChange: _onChange, width: width, margin: margin, num: num, output: output };
  const inputEl = useRef();
  const [blur, setBlur] = useState(false);
  const [inputContent, setContent] = useState();

  if (output) {
    return (
      <InputBox
        {...styles}
        onClick={() => {
          inputEl.current.focus();
        }}
      >
        <input
          ouput={output}
          ref={inputEl}
          placeholder={plcholder}
          value={value}
          onChange={_onChange}
          onFocus={() => setBlur(!blur)}
          onBlur={() => setBlur(false)}
        >
          {children}
        </input>
        {adornment && <span>{adornment}</span>}
      </InputBox>
    );
  }

  return (
    <>
      {blur ? (
        <InputBox
          {...styles}
          focused
          onClick={() => {
            inputEl.current.focus();
          }}
        >
          <input
            ref={inputEl}
            placeholder={plcholder}
            value={value}
            onChange={_onChange}
            onFocus={() => setBlur(!blur)}
            onBlur={() => setBlur(false)}
          >
            {children}
          </input>
          <span>{adornment}</span>
        </InputBox>
      ) : (
        <InputBox
          {...styles}
          onClick={() => {
            inputEl.current.focus();
          }}
        >
          <input
            ref={inputEl}
            placeholder={plcholder}
            value={value}
            onChange={_onChange}
            onFocus={() => setBlur(!blur)}
            onBlur={() => setBlur(false)}
          >
            {children}
          </input>
          <span>{adornment}</span>
        </InputBox>
      )}
    </>
  );
};

Input.defaultProps = {
  _onChange: () => {},
};

const InputBox = styled.div`
  width: ${(props) => (props.width ? props.width : "")};
  margin: ${(props) => (props.width ? props.margin : "")};
  border: 1px solid ${Color.Light_3};
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  ${(props) => (props.focused ? `border: 1px solid ${Color.Primary}; box-shadow: 0 0 0 3px ${Color.Primary}33;` : "")}
  background-color: white;
  transition: border 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  ${(props) => (props.output ? `background-color: ${Color.Light_3}; user-select: none;` : "")}
  input {
    background-color: transparent;
    ::placeholder {
      text-align: left;
      align-items: center;
      font-size: 16px;
      font-weight: 400;
      color: #c0c0c0;
    }
    border: 0px;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    align-items: center;
    font-size: 20px;
    font-weight: 400;
    ${(props) => (props.num ? "text-align: right;" : "")}
    &:focus {
      outline: none;
    }
  }
  span {
    padding-right: 10px;
    font-size: 16px;
    font-weight: 400;
    align-items: center;
    padding: auto 0;
  }
`;

export default Input;
