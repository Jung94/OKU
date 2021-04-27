import React, { useRef, useState } from "react";
import styled from "styled-components";

const Input = (props) => {
  const { width, adornment, plcholder } = props;
  const inputEl = useRef();
  const [blur, setBlur] = useState(false);
  return (
    <>
      {adornment ? (
        blur ? (
          <InputBox
            width={width}
            focused
            onClick={() => {
              inputEl.current.focus();
            }}
          >
            <input ref={inputEl} placeholder={plcholder} className="inputText" onFocus={() => setBlur(!blur)} onBlur={() => setBlur(false)} />
            <span>{adornment}</span>
          </InputBox>
        ) : (
          <InputBox
            width={width}
            onClick={() => {
              inputEl.current.focus();
            }}
          >
            <input ref={inputEl} placeholder={plcholder} className="inputText" onFocus={() => setBlur(!blur)} onBlur={() => setBlur(false)} />
            <span>{adornment}</span>
          </InputBox>
        )
      ) : blur ? (
        <InputBox
          width={width}
          focused
          onClick={() => {
            inputEl.current.focus();
          }}
        >
          <input ref={inputEl} placeholder={plcholder} className="inputText" onFocus={() => setBlur(!blur)} onBlur={() => setBlur(false)} />
        </InputBox>
      ) : (
        <InputBox
          width={width}
          onClick={() => {
            inputEl.current.focus();
          }}
        >
          <input ref={inputEl} placeholder={plcholder} className="inputText" onFocus={() => setBlur(!blur)} onBlur={() => setBlur(false)} />
        </InputBox>
      )}
    </>
  );
};

const InputBox = styled.div`
  width: ${(props) => (props.width ? props.width : "")};
  border: 2px solid #dedede;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  ${(props) => (props.focused ? "border: 2px solid #F112FF; box-shadow: 0 0 7px 0 #F112FF33;" : "")}
  background-color:white;
  transition: border 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  input {
    border: 0px;
    padding-left: 10px;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
  span {
    padding-right: 10px;
  }
  .inputText {
    font-weight: 600;
  }
`;

export default Input;
