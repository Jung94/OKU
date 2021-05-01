import React, { useRef, useState } from "react";
import styled from "styled-components";

const Input = (props) => {
  const { width, margin, adornment, plcholder, num, children, value, onChange } = props;
  const styles = { width: width, margin: margin, num: num };
  const inputEl = useRef();
  const [blur, setBlur] = useState(false);

  return (
    <>
      {adornment ? (
        blur ? (
          <InputBox
            {...styles}
            focused
            onClick={() => {
              inputEl.current.focus();
            }}
          >
            <input ref={inputEl} placeholder={plcholder} value={value} onChange={onChange} className="inputText" onFocus={() => setBlur(!blur)} onBlur={() => setBlur(false)}>
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
            <input ref={inputEl} placeholder={plcholder} value={value} onChange={onChange} className="inputText" onFocus={() => setBlur(!blur)} onBlur={() => setBlur(false)}>
              {children}
            </input>
            <span>{adornment}</span>
          </InputBox>
        )
      ) : blur ? (
        <InputBox
          {...styles}
          focused
          onClick={() => {
            inputEl.current.focus();
          }}
        >
          <input ref={inputEl} placeholder={plcholder} value={value} onChange={onChange} className="inputText" onFocus={() => setBlur(!blur)} onBlur={() => setBlur(false)}>
            {children}
          </input>
        </InputBox>
      ) : (
        <InputBox
          {...styles}
          onClick={() => {
            inputEl.current.focus();
          }}
        >
          <input ref={inputEl} placeholder={plcholder} value={value} onChange={onChange} className="inputText" onFocus={() => setBlur(!blur)} onBlur={() => setBlur(false)}>
            {children}
          </input>
        </InputBox>
      )}
    </>
  );
};

const InputBox = styled.div`
  width: ${(props) => (props.width ? props.width : "")};
  margin: ${(props) => (props.width ? props.margin : "")};
  border: 2px solid #dedede;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  ${(props) => (props.focused ? "border: 2px solid #F112FF; box-shadow: 0 0 7px 0 #F112FF33;" : "")}
  background-color:white;
  transition: border 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  input {
    ::placeholder {
      text-align: left;
    }
    border: 0px;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    ${(props) => (props.num ? "text-align: right;" : "")}
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
