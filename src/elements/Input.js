import React, { useRef, useState } from "react";
import styled from "styled-components";

import { Grid, Text, Button } from "elements/";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare as fasCheckSquare, faCheck as fasCheck } from "@fortawesome/free-solid-svg-icons";

import { Color } from "shared/DesignSys";

const Input = (props) => {
  // adorment는 input 오른쪽에 "원"
  // plcholder는 placeholder
  const {
    output,
    text,
    info,
    left,
    radio,
    disabled,
    width,
    margin,
    adornment,
    plcholder,
    num,
    children,
    value,
    name,
    _onChange,
    fnc,
    btn,
    desc,
  } = props;
  const styles = { name: name, onChange: _onChange, width: width, margin: margin, num: num, info: info, left: left, output: output };
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
          info={info}
          ref={inputEl}
          placeholder={plcholder}
          name={name}
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

  if (radio) {
    return (
      <RadioCheck
        {...styles}
        onClick={() => {
          inputEl.current.focus();
        }}
      >
        <input
          type="radio"
          ouput={output}
          info={info}
          ref={inputEl}
          placeholder={plcholder}
          name={name}
          value={value}
          onChange={_onChange}
          onFocus={() => setBlur(!blur)}
          onBlur={() => setBlur(false)}
        >
          {children}
        </input>
        <span className="checkmark" />
        <div>
          &ensp;{value}&ensp;
          <Text subBody color={Color.Dark_4}>
            {desc}
          </Text>
        </div>
      </RadioCheck>
    );
  }

  if (text) {
    return (
      <>
        {blur ? (
          <TextareaBox
            {...styles}
            focused
            onClick={() => {
              inputEl.current.focus();
            }}
          >
            <textarea
              ref={inputEl}
              placeholder={plcholder}
              value={value}
              onChange={_onChange}
              onFocus={() => setBlur(!blur)}
              onBlur={() => setBlur(false)}
            >
              {children}
            </textarea>
            {btn && (
              <div>
                <Text h4 color={Color.Light_3}>
                  {adornment}
                </Text>
                <Button width="30%" _onClick={fnc} margin="0 0 0 10px ">
                  {btn}
                </Button>
              </div>
            )}
          </TextareaBox>
        ) : (
          <TextareaBox
            {...styles}
            onClick={() => {
              inputEl.current.focus();
            }}
          >
            <textarea
              ref={inputEl}
              placeholder={plcholder}
              value={value}
              onChange={_onChange}
              onFocus={() => setBlur(!blur)}
              onBlur={() => setBlur(false)}
            >
              {children}
            </textarea>
            {btn && (
              <div>
                <Text h4 color={Color.Light_3}>
                  {adornment}
                </Text>
                <Button width="30%" _onClick={fnc} margin="0 0 0 10px ">
                  {btn}
                </Button>
              </div>
            )}
          </TextareaBox>
        )}
      </>
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
  border-radius: 16px;
  padding: 10px;
  ${(props) => (props.focused ? `border: 1px solid ${Color.Primary}; box-shadow: 0 0 0 3px ${Color.Primary}33;` : "")}
  transition: border 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  ${(props) => (props.output ? `background-color: ${Color.Light_3}; user-select: none; height: 50px;` : "background-color: white;")}
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
    ${(props) => (props.info ? "font-size: 16px; text-align: center;" : "font-size: 20px;")}
    ${(props) => (props.left ? "font-size: 16px; text-align: left;" : "font-size: 20px;")}
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

const RadioCheck = styled.label`
  align-items: center;
  display: flex;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: background-color 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  :hover {
    span {
      box-shadow: 0 0 0 3px ${Color.Primary}33;
      background-color: ${Color.Light_2};
    }
  }
  input {
    opacity: 0;
    height: 0;
    width: 0;
    &:focus {
      outline: none;
    }
    :checked ~ .checkmark {
      background-color: white;
      border: 7px solid ${Color.Primary};
    }
  }
  // checkmark
  span {
    display: flex;
    align-items: center;

    height: 20px;
    width: 20px;
    background-color: ${Color.Light_3};
    border-radius: 50%;
    transition: box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    :hover {
      box-shadow: 0 0 0 3px ${Color.Primary}33;
    }
  }
  // desc
  div {
    display: flex;
    align-items: center;
  }
`;

const TextareaBox = styled.div`
  width: ${(props) => (props.width ? props.width : "")};
  margin: ${(props) => (props.margin ? props.margin : "")};
  min-height: 146px;
  border: 1px solid ${Color.Light_3};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  padding: 25px;
  box-sizing: border-box;
  ${(props) => (props.focused ? `border: 1px solid ${Color.Primary}; box-shadow: 0 0 0 3px ${Color.Primary}33;` : "")}
  transition: border 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  ${(props) => (props.output ? `background-color: ${Color.Light_3}; user-select: none; height: 50px;` : "background-color: white;")}
  textarea {
    box-sizing: border-box;

    width: 100%;
    background-color: transparent;
    ::placeholder {
      text-align: left;
      align-items: center;
      font-size: 16px;
      font-weight: 400;
      color: #c0c0c0;
    }
    border: 0px;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    min-height: 100px;
    height: 100%;
    align-items: center;
    font-weight: 400;
    font-size: 16px;
    ${(props) => (props.num ? "text-align: right;" : "")}
    &:focus {
      outline: none;
    }
  }
  div {
    width: 30%;
    display: inline-flex;
    justify-content: flex-end;
    text-align: right;
    align-items: center;
    margin: 20px 0 0 auto;
  }
`;

export default Input;
